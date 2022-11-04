const buildList = (o) => {
  if (Array.isArray(o) && o.length) {
    let x = '<ol>';
    for (const el of o) {
      x += `<li>${el}</li>`;
    }
    return x + '</ol>';
  }

  if (o && typeof o === 'object' && Object.keys(o)) {
    let x = '<ul>';
    for (const key of Object.keys(o)) {
      x += `<li>${buildList(key)}: ${buildList(o[key])}</li>`;
    }
    return x + '</ul>';
  }

  return o;
}
const renderEvent = () => {
  return {
    name: 'add-to-dom',
    type: 'destination',
    setup: () => Promise.resolve(),
    execute: (event) => {
      const item = document.createElement('li');
      innerHTML = ``;
      innerHTML += event.event_type;
      if (event.user_properties) {
        innerHTML += buildList(event.user_properties);
      }
      if (event.event_properties) {
        innerHTML += buildList(event.event_properties);
      }
      innerHTML += buildList({library: event.library });
      item.innerHTML = innerHTML;
      document
        .getElementById('events')
        .appendChild(item);
      return Promise.resolve();
    }
  }
};
