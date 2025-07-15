import React, { useState } from 'react';
import sun from './assets/images/icon-sun.svg'
import moon from './assets/images/icon-moon.svg'
import check from './assets/images/icon-check.svg'
import cross from './assets/images/icon-cross.svg'
const App = () => {
  const [mode, setMode] = useState(sun);
  const [isDark, setisDark] = useState(true);
  const [Input, setInput] = useState("")
  const [tache, setTache] = useState([]);
  const [isclicked, setIsclicked] = useState(false);
  const [count, setCount] = useState(0)
  const [allTaches, setAllTaches] = useState([]);

  const [draggedIndex, setDraggedIndex] = useState(null);

  const toggleTache = (index) => {
    const updatedAll = allTaches.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setAllTaches(updatedAll);
    setTache(updatedAll);
    setCount(updatedAll.filter(t => !t.completed).length);
  };


  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (index) => {
    if (draggedIndex === null || draggedIndex === index) return;

    const newItems = [...tache];
    const draggedItem = newItems[draggedIndex];
    newItems.splice(draggedIndex, 1);
    newItems.splice(index, 0, draggedItem);

    setTache(newItems);
    setAllTaches(newItems);
    setDraggedIndex(null);
  };



  const supprimTache = (index) => {
    const updated = allTaches.filter((_, i) => i !== index);
    setAllTaches(updated);
    setTache(updated);
    setCount(updated.filter(t => !t.completed).length);
  };
  const handleAll = () => {
    setTache(allTaches);
    setCount(allTaches.filter(t => !t.completed).length);
  };

  const handleComplete = () => {
    const completed = allTaches.filter(t => t.completed);
    setTache(completed);
    setCount(completed.filter(t => !t.completed).length);
  };

  const handleInComplete = () => {
    const incompletes = allTaches.filter(t => !t.completed);
    setTache(incompletes);
    setCount(incompletes.length);
  };

  const listitems = tache.map((item, index) => (
    <li
      key={index}
      className={`flex items-center w-full min-h-[50px]  mt-[1px] pl-[30px]  shadow-xl 
        ${isDark ? 'bg-[#25273c] text-white' : 'bg-white'} 
        ${index === 0 ? 'first:rounded-t-[5px]' : ''} 
         : ''}`}
      draggable
      onDragStart={() => handleDragStart(index)}
      onDragOver={handleDragOver}
      onDrop={() => handleDrop(index)}
      style={{


      }}
    >
      <div
        className={`
          relative p-[2px] w-[25px] h-[25px] rounded-full mr-3 cursor-pointer
          ${item.completed ? 'bg-gradient-to-r from-[#70bdfe] to-[#a673f4]' : 'border border-gray-700'}
        `}
        onClick={() => toggleTache(index)}
      >
        <div className={`w-full h-full rounded-full flex items-center justify-center `}>
          <span className={`${item.completed ? 'flex' : 'hidden'}`}>
            <img src={check} alt="check" />
          </span>
        </div>

      </div>

      <div className={`${item.completed ? 'line-through text-gray-500' : ''} break-words w-[250px] `}>
        {item.titre}
      </div>

      <div className="cross ml-[80%] absolute 
" onClick={() => supprimTache(index)}><img src={cross} alt="check" /></div>
    </li>

  ));

  const ajouter = () => {
    if (Input !== "") {
      const nouvelleTache = { titre: Input, completed: false };
      const nouvellesTaches = [...tache, nouvelleTache];
      setTache(nouvellesTaches);
      setAllTaches(nouvellesTaches);
      setInput("");
      setIsclicked(true);
      setCount(nouvellesTaches.filter(t => !t.completed).length);
    }
  };


  const handleChangeMode = () => {
    setisDark(!isDark);
    setMode(isDark ? moon : sun);

  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      ajouter();
      setInput('');
    }

  };

  return (
    <div>
      <div className={`part1 w-full h-[350px] ${isDark ? 'bg-[url(./src/assets/images/bg-desktop-dark.jpg)]' : 'bg-[url(./src/assets/images/bg-desktop-light.jpg)]'}  bg-center bg-cover bg-no-repeat`}>

        <div className="list w-[30%] h-[400px]  absolute ml-[32%] mt-[7%]">
          <div className=' flex justify-between'>
            <div> <h1 className='text-[40px] font-medium text-white tracking-[7px]'>TODO</h1>

            </div>
            <div onClick={handleChangeMode} className='mt-[20px]'><img src={mode} alt="" />
            </div>
          </div>


          <div className="input ">
            <input type="text"
              placeholder='Entrez une tache'
              value={Input}
              className={`w-[100%] h-[50px] mt-[50px] rounded-[5px] ${isDark ? 'bg-[#25273c]' : 'bg-white'}  pl-[30px] mb-[40px] outline-none focus:outline-none`}
              onChange={(e) =>
                setInput(e.target.value)
              }
              onKeyDown={handleKeyDown}
            />
          </div>
          <div><ul>
            {listitems}</ul>
          </div>
          {isclicked == true ? <div className={`flex items-center rounded-b-[5px] w-full min-h-[50px]  mt-[1px] pl-[30px] pointer shadow-xl justify-between text-[12px] text-[#5e607a] pr-[30px]
        ${isDark ? 'bg-[#25273c] text-white' : 'bg-white'} 
  `}> {count} items left <div className='justify-between pointer'> <span onClick={handleAll}>All</span>  <span className='pl-[50px] pointer' onClick={handleComplete}> Completed</span></div> <span className='pointer' onClick={handleInComplete} >Clear Completed</span></div> : ''}

        </div>

      </div>
      <div className={`part2 ${isDark ? 'bg-[#181824]' : 'bg-white'}  w-full h-[640px] `}></div>
    </div>
  );
};

export default App;