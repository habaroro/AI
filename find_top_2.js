const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = 'https://biibtfdpchcdlpfimimh.supabase.co';
const SUPABASE_KEY = 'sb_publishable_yDCKYS2CXf3-WGzgpJ_pQA_pTF_p68p';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function findTop2() {
    const { data: finalVotes, error: voteError } = await supabase.from('final_votes').select('submission_id');
    if (voteError) {
        console.error('Error fetching final votes:', voteError);
        return;
    }

    const counts = {};
    finalVotes.forEach(v => {
        counts[v.submission_id] = (counts[v.submission_id] || 0) + 1;
    });

    const sortedIds = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
    const top2Ids = sortedIds.slice(0, 2);

    const { data: submissions, error: subError } = await supabase.from('submissions').select('*').in('id', top2Ids);
    if (subError) {
        console.error('Error fetching submissions:', subError);
        return;
    }

    console.log('Top 2 Submissions:');
    submissions.forEach(s => {
        console.log(`- ID: ${s.id}, Title: ${s.song_title}, Votes: ${counts[s.id]}`);
    });
}

findTop2();
