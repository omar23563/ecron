import { supabase } from './lib/supabase.js'

const banner = document.getElementById('bottom-banner')

// دالة لعرض قائمة بالعناصر (tasks & annonces)
function renderItems(items) {
  if (!items.length) {
    banner.textContent = 'لا توجد مهام أو إعلانات حالياً'
    return
  }
  banner.innerHTML = items
    .map(i => `<span class="mx-4">${i.content}</span>`)
    .join(' • ')
}

// جلب البيانات المبدئي
async function loadInitial() {
  // مثال لجلب المهام
  const { data: tasks } = await supabase
    .from('tasks')
    .select('content')
    .order('created_at', { ascending: true })

  // إذا لديك جدول للإعلانات (مثلاً announcements) جلبه بنفس الطريقة
  const { data: annonces } = await supabase
    .from('annonces')
    .select('content')
    .order('created_at', { ascending: true })

  // دمج المصفوفات
  const items = [
    ...tasks.map(t => ({ content: t.content })),
    ...annonces.map(a => ({ content: a.content })),
  ]
  renderItems(items)
}

// الاشتراك في الإضافة (INSERT) والحدف (DELETE) للتحديث التلقائي
function subscribeRealTime() {
  // على جدول tasks
  supabase
    .channel('realtime-tasks')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, loadInitial)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'annonces' }, loadInitial)
    .subscribe()
}

// بدء كل شيء
loadInitial()
subscribeRealTime()
