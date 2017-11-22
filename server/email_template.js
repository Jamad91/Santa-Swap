module.exports = function (giver, receiver) {
  return (
    `


<div style="align-items: center;  text-align: center;">
<div>
<div>
<h1 style="font-family: cursive; font-size: 250%;;">Hello, ${giver.firstName}!</h1>
<img src='https://i.imgur.com/aDbNXjl.png' /><br /><br /><br />
<img src='https://i.imgur.com/084Oq3e.png' style="width: 20%;"/>

<h2 style="font-family: cursive; font-size: 200%;">Thanks again for participating in Secret Santa 2017!</h2>


<div style="border: solid 3px red; border-radius: 10%; background-color: #9eeba9; padding-bottom: 2%;">

<h2>You are getting a present for
<span style="font-family: cursive; font-size: 150%;">${receiver.firstName} ${receiver.lastName}</span></h2>

<div>
  <h2>Their address is:</h2>
  <span style="font-size: 150%">${receiver.address1}<br />
  ${receiver.address2}</span>
</div>

<div>
  <p>
    <h2>They like:</h2>
    <span style="font-size: 150%">${receiver.likes}</span>
  </p>
</div>

<div>
  <p>
    <h2>They dislike:</h2>
    <span style="font-size: 150%">${receiver.dislikes}</span>
  </p>
</div>

<div>
  <p>
    <h2>Anything else to know about them:</h2>
    <span style="font-size: 150%">${receiver.misc}</span>
  </p>
</div>
</div>

</div>

    `
  )
}
