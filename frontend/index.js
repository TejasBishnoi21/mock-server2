console.log("jai shree ram");
const url = 'https://tejas-mock-server.onrender.com/students'

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let data = {
    name:document.getElementById("name").value,
    rollNo:document.getElementById("roll").value,
    status:false,
  };
  
  addDetails(data);
});

const addDetails= async(data)=>{
    let res = await fetch(url,{
        method:"POST",
        body: JSON.stringify(data),
        headers:{
            "Content-Type":"application/json"
        }
    }).then((res)=>console.log(res))
}

const getData= async()=>{
    let res = await fetch(url);
    let data_s = await res.json();

    renderData(data_s);
}
getData()

const renderData=(data)=>{
    console.log(data)
    const container = document.getElementById('display');
    container.innerHTML=null;

    data.forEach((el,index)=>{
        const box = document.createElement('div');
        const p1 = document.createElement('p');
        p1.innerText='Name: '+el.name
        const p2 = document.createElement('p');
        p2.innerText='Roll No: '+el.rollNo
        const p3 = document.createElement('p');
        if(el.status) p3.innerText='Status: Done'
        else p3.innerText='Status: Pending';

        const btnBox = document.createElement('div');
        const b1 = document.createElement('button');
        b1.innerText= 'Edit'
        b1.onclick=()=>{
            editDetails(el.id);
        }
        const b2 = document.createElement('button');
        b2.innerText = 'Delete'
        b2.onclick=()=>{
            deleteFun(el.id)
        }
        btnBox.append(b1,b2)

        box.append(p1,p2,p3, btnBox)
        box.style.border='1px solid #ddd'

        container.append(box)
    })
}

const editDetails = async(id)=>{
    let value = window.prompt("Enter New Name")
    let newName = {name:value}
    // console.log(value)
    let res = await fetch(`${url}/${id}`,{
        method:"PATCH",
        body: JSON.stringify(newName),
        headers:{
            "Content-Type":"application/json"
        }
    }).then((res)=>getData())
}

const deleteFun= async(id)=>{
    let res = await fetch(`${url}/${id}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        }
    }).then((res)=>getData())
}
