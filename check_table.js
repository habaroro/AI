const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = 'https://biibtfdpchcdlpfimimh.supabase.co';
const SUPABASE_KEY = 'sb_publishable_yDCKYS2CXf3-WGzgpJ_pQA_pTF_p68p';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function checkTable() {
    const { error } = await supabase.from('super_final_votes').select('*').limit(1);
    if (error) {
        console.log('Error or table not found:', error.message);
    } else {
        console.log('Table super_final_votes exists!');
    }
}

checkTable();
