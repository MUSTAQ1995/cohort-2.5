const express = require("express");

const app = express();

const users = [
  {
    name: "Mustaq",
    metadata: {
      profilePicture: "",
      pronouns: "he/him",
    },
    kidneys: [
      {
        "healthy": false
      }
    ]
  }
];

app.use(express.json());

const CountSum = (n) => {
  let ans = 0;
  for (let i = 1; i <= n; i++) {
    ans = ans + i
  }
  return ans
}

// app.get("/", (req, res) => {
//   const n = req.query.n;
//   const ans = CountSum(n)
//   res.send(" The summation of the given query paremeter is :" + ans)
// })

app.get("/", (req, res) => {
  const kidnies = users[0].kidneys;
  const NumberOfKidnies = kidnies.length;
  let healthyKidneies = 0;
  for(let i = 0; i< NumberOfKidnies; i++ ) {
    if(kidnies[i].healthy){
      healthyKidneies = healthyKidneies + 1;
    }
  }
  const UnhealthyKidnies = NumberOfKidnies - healthyKidneies;
  res.json({
    // kidnies,
    NumberOfKidnies,
    healthyKidneies,
    UnhealthyKidnies,
  })
});

app.post("/", (req, res)=>{
  const isHealthy = req.body.isHealthy;
  users[0].kidneys.push({
    healthy:isHealthy
  })
  res.json({
    msg:"Kednies are updated!"
  })
});

app.put("/", (req, res)=>{
  if(atleastOneUnhealtyKidney){
    for(let i=0; i < users[0].kidneys.length; i++){
      users[0].kidneys[i].healthy = true;
    }
    res.json({})
  }else {
    res.status(411).json({
      msg:"There no any un healthy kidnies"
    })
  }
  
});

app.delete("/", (req, res)=>{
  if(atleastOneUnhealtyKidney()){
    const newKednies = [];
    for(let i=0; i < users[0].kidneys.length; i++){
      if(users[0].kidneys[i].healthy){
        newKednies.push({
          healthy:true
        })
      }
    }
    users[0].kidneys =  newKednies
    res.json({msg:"Unhealthy kidinies are removed"})
  } else {
    res.status(411).json({
      msg:"There no any un healthy kidnies"
    })
  }

});

const atleastOneUnhealtyKidney = () =>{
  let atleastOneUnhealtyKidney = false;
  for(let i = 0; i < users[0].kidneys.length; i++){
    if(!users[0].kidneys[i].healthy){
      atleastOneUnhealtyKidney = true
    }
  }
  return atleastOneUnhealtyKidney
}
app.listen(3000);

