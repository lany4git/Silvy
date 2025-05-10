```dataviewjs
const pages = dv.pages('"content"')  .where(p => p.last_update)  .sort(p => p.last_update, 'desc')  .slice(13, 18);const rows = pages.map(p => {  const tasks = p.file.tasks || [];  const completed = tasks.filter(t => t.completed).length;  const total = tasks.length;  const percent = total === 0 ? "0%" : `${Math.round((completed / total) * 100)}%`;  const isCompleted = p.completed ? "✅" : "❌";  return [    dv.fileLink(p.file.name),    p.last_update ?? "-",    p.priority ?? "-",    p.description ?? "-",    percent,    isCompleted  ];});dv.table(  ["File", "Last Updated", "Priority", "Description", "Task Completion", "Completed"],  rows);
```

edit .silce (#,#)