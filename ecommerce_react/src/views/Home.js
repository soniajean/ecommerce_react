import { useEffect, useState } from "react";


const Home = props => {
    // let x = 'Friction plate';
    // console.log(x);
    // x = 'thrust bearing';
    /* Component state is basically a collection of data/objects/functions associated with the LIFECYCLE of that component
    - noticed the useSomething somewhere--- that's a hook!
    - useState(), useEffect(), useContext(). . . these may be the most common BUT there's a bunch of others
    and we can make our own custom hooks.
    - hooks provide special behavior that influence a components lifecycle
    */


    const [animal, setAnimal] = useState('Black Bear'); //initial value
    // why state?  Because every time state is MUTATED the component will
    // reload/render/update

    // const changeAnimal = () => {
    //     console.log('BUTTON CLICKED!!!');  // This is the WRONG WAY, it doesn't work
    //     animal = 'Tiger';
    // }

    /* in order to properly mutate state:
    - we have to make a copy
    - change the copy
    - set the state to that copy; specifically using the setter!
    */
    useEffect(() => {console.log('HOME component has rendered (or re-rendered)')});
   const changeAnimal = () => {
    if (animal === 'Black Bear'){
        setAnimal('Tiger');
    } else {
        setAnimal('Black Bear');
    };
   }

   
   const changeTeacherOrder= () => {
    // 1. grab state and make a copy
    let teachercopy = [...props.teachers]; //What is this?  JS spread operator
    // 2. modify that copy
    let popped = teachercopy.pop();
    teachercopy.splice(0,0, popped);
    // 3. OPTIONAL step: test/verify
    console.log(props.teachers);
    // 4. Mutate state with the setter (which will cause a re-render)
    props.setTeachers(teachercopy);
}



    return (
        <>
        <div>
            <h1> There is no place like home Toto</h1>
            <h3>{animal}</h3>
            {/* <h3>{x}</h3> */}
            <button className="btn btn-warning w-25" onClick={changeAnimal}>Change Animal</button>
        </div>
        <div>
                        <h2>Our Teachers:</h2>
            <button className="btn btn-primary w-25" onClick={changeTeacherOrder}>Change Teacher Order</button>
            {props.teachers.map((teacher, index) => {
                return <h3 key={index}>{teacher}</h3>
            })}
        </div>
        </>
    );
}


export default Home;