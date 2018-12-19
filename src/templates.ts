//FIXME: vmi common-ba kiszervezni.
export function mkTemplate(html: string) {
  const template = document.createElement('template');
  template.innerHTML = html;
  return template;
}