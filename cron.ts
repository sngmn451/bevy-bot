const cron = require('node-cron')

let socialAnimal = 0
const socialAnimalTask = cron.schedule('*/2 * * * * *', async () => {
  socialAnimal++
  const feedFetchUrl = 'http://localhost:3049/api/social-animals'
  const feedFetchResponse = await fetch(feedFetchUrl)

  console.log(`Fetch social animal`, socialAnimal, await feedFetchResponse.text())

}, {
  runOnInit: false
})

socialAnimalTask.start()

/**
 * Slushy feed
 */

// let iterate = 0
// const task = cron.schedule('*/15 * * * * *', async () => {
//   iterate++
//   const feedFetchUrl = 'http://localhost:3049/api/slushy/fetch/feed'
//   const feedFetchResponse = await fetch(feedFetchUrl)

//   console.log(`feedFetch#`, iterate, await feedFetchResponse.text())

// }, {
//   runOnInit: false
// })

// task.start()

// let iterate2 = 0

// const task2 = cron.schedule('*/9 * * * * *', async () => {
//   iterate2++
//   const feedCreatorFetchUrl = 'http://localhost:3049/api/slushy/fetch/creator/feed'
//   const feedCreatorFetchResponse = await fetch(feedCreatorFetchUrl)
//   console.log(`feedCreatorFetch#`, iterate, await feedCreatorFetchResponse.text())

// }, {
//   runOnInit: false
// })

// task2.start()

//
