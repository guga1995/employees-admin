const Menu = [
  {
    title: 'Companies',
    icon: 'business',
    name: 'Companies',
    href: '/companies'
  },
  {
    title: 'Employees',
    icon: 'groups',
    name: 'Employees',
    href: '/employees'
  },
];
// reorder menu
Menu.forEach((item) => {
  if (item.items) {
    item.items.sort((x, y) => {
      let textA = x.title.toUpperCase();
      let textB = y.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }
});

export default Menu;
