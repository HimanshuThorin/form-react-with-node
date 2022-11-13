import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState([]);
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: ""
  })

  useEffect(function () {
    // fetch("http://localhost:5000")
    //   .then(function (res) {  //res contains resolved value of the promise.
    //     return res.json();
    //   })
    //   .then(function (data) {
    //     console.log(data)
    //     setMessage(data.message)
    //   })
    axios.get("http://localhost:5000")
    .then(function(res){
    // console.log(res.data.result)
    setMessage(res.data.result)
    });  //Very simply put, the array you provide is telling useEffect that it should run when the values inside the array changes. Since the value is static it will only run once. If you remove the array it will run on every render. You can also put a variable inside the array to tell useEffect to update whenever the variable changes. 
      // render happens here when usestate fn works. so on every submit teh data is being received and message is being filled.

  }); //ek hi baar render hoga jab page reload hoga.

  function changeUserInfo(event) {
    let name = event.target.name;
    let value = event.target.value;

    setUserInfo(function(prev){
     return {...prev, [name]: value}
    })
  
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios.post("http://localhost:5000/", {userInfo})
    .then(function(res){
      console.log(res)
    })
    .catch(function(error){
      console.log(error)
    })
    // setUserInfo(function(){
    //   return {
    //     fullName: "",
    //     email: ""
    //   }
    // });
  }

  return (
    <div>
      <h1>Hello React</h1>
      
      <form>
        <input onChange={changeUserInfo} type="text" placeholder="Enter your name" name="fullName" ></input>
        <input onChange={changeUserInfo} type="email" placeholder="email id" name="email" ></input>
        <button onClick={handleSubmit} type="submit">Submit</button>
      </form>

    {message.map(function(items){
      return <p>{items.fullName} {items.email}</p>
    })}

    </div>
  );
}

export default App;
