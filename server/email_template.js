module.exports = function (giver, receiver) {
  return (
    `
    <link rel="stylesheet" href="../public/style.css">
    <link rel="stylesheet" href="../public/present.css">
    <link href="https://fonts.googleapis.com/css?family=Alegreya+SC|Antic|Carter+One|Happy+Monkey|Racing+Sans+One|Viga" rel="stylesheet">
    <style>
    .header-font {
      font-family: 'Alegreya SC', serif;
    }
    </style>
        <div><h1 class="header-font">Hello, ${giver.firstName}.</h1></div>
        You are getting a present for ${receiver.firstName} ${receiver.lastName}.
        Their address is:
        ${receiver.address1}
        ${receiver.address2}


        They like: <br />
        ${receiver.likes}
        <br />
        They dislike: <br />
        ${receiver.dislikes}
        <br /><br />
        Anything else to know about them: <br />
        ${receiver.misc}
      </div>
    `
  )
}
