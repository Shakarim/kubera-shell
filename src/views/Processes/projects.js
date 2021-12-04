function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
function getRandomParagraph() {
  let data = [
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
    'Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
    'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
    'Sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
    'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?',
    'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat',
    'Quo voluptas nulla pariatur?'
  ];
  return data[getRandomInt(data.length - 1)]
}
export default [
  {
    img: 'img/theme/bootstrap.jpg',
    title: 'Argon Design System',
    description: getRandomParagraph(),
    budget: '$2500 USD',
    status: 'pending',
    statusType: 'warning',
    instanceCount: getRandomInt(10),
    incidentsCount: getRandomInt(10),
    averageExecutionTime: getRandomInt(500),
    completion: getRandomInt(100)
  },
  {
    img: 'img/theme/angular.jpg',
    title: 'Angular Now UI Kit PRO',
    description: getRandomParagraph(),
    budget: '$1800 USD',
    status: 'completed',
    statusType: 'success',
    instanceCount: getRandomInt(10),
    incidentsCount: getRandomInt(10),
    averageExecutionTime: getRandomInt(500),
    completion: getRandomInt(100)
  },
  {
    img: 'img/theme/sketch.jpg',
    title: 'Black Dashboard',
    description: getRandomParagraph(),
    budget: '$3150 USD',
    status: 'delayed',
    statusType: 'danger',
    instanceCount: getRandomInt(10),
    incidentsCount: getRandomInt(10),
    averageExecutionTime: getRandomInt(500),
    completion: getRandomInt(100)
  },
  {
    img: 'img/theme/react.jpg',
    title: 'React Material Dashboard',
    description: getRandomParagraph(),
    budget: '$4400 USD',
    status: 'on schedule',
    statusType: 'info',
    instanceCount: getRandomInt(10),
    incidentsCount: getRandomInt(10),
    averageExecutionTime: getRandomInt(500),
    completion: getRandomInt(100)
  },
  {
    img: 'img/theme/vue.jpg',
    title: 'Vue Paper UI Kit PRO',
    description: getRandomParagraph(),
    budget: '$2200 USD',
    status: 'completed',
    statusType: 'success',
    instanceCount: getRandomInt(10),
    incidentsCount: getRandomInt(10),
    averageExecutionTime: getRandomInt(500),
    completion: getRandomInt(100)
  },
  {
    img: 'img/theme/bootstrap.jpg',
    title: 'Argon Design System',
    description: getRandomParagraph(),
    budget: '$2500 USD',
    status: 'pending',
    statusType: 'warning',
    instanceCount: getRandomInt(10),
    incidentsCount: getRandomInt(10),
    averageExecutionTime: getRandomInt(500),
    completion: getRandomInt(100)
  },
  {
    img: 'img/theme/angular.jpg',
    title: 'Angular Now UI Kit PRO',
    description: getRandomParagraph(),
    budget: '$1800 USD',
    status: 'completed',
    statusType: 'success',
    instanceCount: getRandomInt(10),
    incidentsCount: getRandomInt(10),
    averageExecutionTime: getRandomInt(500),
    completion: getRandomInt(100)
  },
  {
    img: 'img/theme/sketch.jpg',
    title: 'Black Dashboard',
    description: getRandomParagraph(),
    budget: '$3150 USD',
    status: 'delayed',
    statusType: 'danger',
    instanceCount: getRandomInt(10),
    incidentsCount: getRandomInt(10),
    averageExecutionTime: getRandomInt(500),
    completion: getRandomInt(100)
  },
  {
    img: 'img/theme/vue.jpg',
    title: 'Vue Paper UI Kit PRO',
    description: getRandomParagraph(),
    budget: '$2200 USD',
    status: 'completed',
    statusType: 'success',
    instanceCount: getRandomInt(10),
    incidentsCount: getRandomInt(10),
    averageExecutionTime: getRandomInt(500),
    completion: getRandomInt(100)
  }
]
