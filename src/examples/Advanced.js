import React, { useState, useMemo } from 'react'
// import TinderCard from '../react-tinder-card/index'
import TinderCard from 'react-tinder-card'
import { NeuDiv } from "neumorphism-react";
import { NeuButton } from "neumorphism-react";
import { ToastContainer, toast } from 'react-toastify';
import NotificationContent from '../NotificationContent';

import 'react-toastify/dist/ReactToastify.css';
const db = [
  { 
    name: 'Jisoo Kim',
    description: 'Artist',
    url: 'https://cdn.discordapp.com/attachments/893904551265067018/894040557788229692/image1.jpg',
    contact: 'https://www.instagram.com/sooyaaa__/'
 
 },
  { 
    name: 'Lisa Manoban',
    description: 'Artist',
    url: 'https://cdn.discordapp.com/attachments/893904551265067018/894040557469433886/image0.jpg',
    contact: 'https://www.instagram.com/lalalalisa_m/'
 
 },
  { 
    name: 'Sana Minatozaki',
    description: 'Professional Dancer',
    url: 'https://cdn.discordapp.com/attachments/893904551265067018/894034794680299580/2ZeWW_5f.png',
    contact: 'https://www.instagram.com/twicetagram/'
 
 },
  {
    name: 'Jennie Kim',
    description: 'Financial Analyst',
    url: 'https://cdn.discordapp.com/attachments/893904551265067018/894032646429110282/20211002_212112.jpg',
    contact: 'https://www.instagram.com/jennierubyjane/'
  },

  {
    name: 'Romain Grosjean',
    description: 'Sound Engineer',
    url: 'https://i.imgur.com/iz7UUb4.jpg',
    contact: 'https://www.instagram.com/grosjeanromain/'
  },
  {
    name: 'Zach Song',
    description: 'Hedge Fund Manager',
    url: 'https://cdn.discordapp.com/attachments/893904551265067018/894042220481638421/image0.jpg',
    contact: 'https://www.linkedin.com/in/j-gu/'
  },
  {
    name: 'Richard Xu',
    description: 'Designer',
    url: 'https://i.imgur.com/TdUAjp2.jpg',
    contact: 'https://www.instagram.com/richxrd_xu/'
  },
  {
    name: 'Justin Gu',
    description: 'Software Developer',
    url: 'https://i.imgur.com/8XVZnE8.jpeg',
    contact: 'https://www.linkedin.com/in/j-gu/'
  },
  {
    name: 'Amya Singhal',
    description: 'Software Developer',
    url: 'https://i.imgur.com/BkvfcHk.jpg',
    contact: 'https://www.linkedin.com/in/amya-singhal-43b7791b3/'
  },
  {
    name: 'George Shao',
    description: 'Software Engineer',
    url: 'https://i.imgur.com/OdIKGWG.jpeg',
    contact: 'https://www.linkedin.com/in/georgeshao/'
  },
  {
    name: 'Mitchell Bradbury',
    description: 'Market Analyst',
    url: 'https://i.imgur.com/k6nU3r2.jpg',
    contact: 'https://www.linkedin.com/in/mitchell-bradbury-1b60a71b1/'
  }



]

const alreadyRemoved = []
let charactersState = db // This fixes issues with updating characters state forcing it to use the current state and not the state that was active when the card was created.

function Advanced () {
  const [characters, setCharacters] = useState(db)
  const [lastDirection, setLastDirection] = useState()

  const childRefs = useMemo(() => Array(db.length).fill(0).map(i => React.createRef()), [])

  const swiped = (direction, nameToDelete, contact) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
    alreadyRemoved.push(nameToDelete)
    if (direction === "right"){
      notify(nameToDelete, contact)
    }
  }

  // const notify = (name) => 

  function notify(name, contact){
    toast(<NotificationContent name={name} contact={contact}/>);
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
    charactersState = charactersState.filter(character => character.name !== name)
    setCharacters(charactersState)
  }

  const swipe = (dir) => {
    const cardsLeft = characters.filter(person => !alreadyRemoved.includes(person.name))
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].name // Find the card object to be removed
      const index = db.map(person => person.name).indexOf(toBeRemoved) // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir) // Swipe the card!
    }
  }



  return (
    <div>
      <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
      <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
      <h1>CoFindr</h1>
      <div className='cardContainer'>
      <NeuDiv color="#c4ceff"  radius={25}>
        {characters.map((character, index) =>
          <div>
            <TinderCard ref={childRefs[index]} className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name, character.contact)} onCardLeftScreen={() => outOfFrame(character.name)}>
              <div style={{backgroundImage: "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.5)), " + "url(" + character.url + ")"}} className='card'>
                <h3>{character.name}</h3>
                <h5 onclick="alert('test')">{character.description}</h5>
              </div>
            </TinderCard>
          </div>
        )}
      </NeuDiv>
      </div>
      <div className='buttons'>
          <NeuButton 
            color="#c4ceff"
            onClick={() => swipe('left')}>Swipe left!
          </NeuButton>
          <NeuButton 
            color="#c4ceff"
            onClick={() => swipe('right')}>Swipe right!
          </NeuButton>

        
      </div>
      {lastDirection ? <h2 key={lastDirection} className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText'>Swipe a card or press a button to get started!</h2>}
      <ToastContainer />
    </div>
  )
}

export default Advanced
