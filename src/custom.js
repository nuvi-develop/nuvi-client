export const isSameDate = (date1,date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    )
  }

export const stepSize = (totalSupplies) => {
  if(totalSupplies && totalSupplies.length>0){
    const topValue = totalSupplies.reduce((top,supply)=>{
      return (top>supply ? top : supply)
    })
    return Math.ceil(topValue/10/100)*100
  } else {
    return 1000
  }
  }

export const getDataPerDate = (supplyAndLefts,date) => {
  return supplyAndLefts.filter(sl => {
    return isSameDate(new Date(sl.date),date)
  })
}

export const getFoodList = (supplyAndLefts) => {
  return supplyAndLefts.reduce((acc,cur)=>{
    if(acc.find((ele)=>ele===cur.Food.name)===undefined){
      acc.push(cur.Food.name)
    }
    return acc
  },[])
}

export const getFoodAllList = (supplyAndLefts) => {
  return supplyAndLefts.reduce((acc,cur)=>{
    if(acc.find((ele)=>ele.name===cur.Food.name)===undefined){
      acc.push(cur.Food)
    }
    return acc
  },[])
}

export const getDataPerFood = (foodList,supplyAndLefts) => {
  return foodList.reduce((acc,cur)=>{
    const supplyLeft = supplyAndLefts.reduce((total,sl)=>{
      if(sl.Food.name===cur){
        total.supply += sl.food_supply;
        total.left += sl.food_left;
      }
      return total
    },{supply:0,left:0})
    acc.supply.push(supplyLeft.supply);
    acc.left.push(supplyLeft.left);
    return acc
  },{supply:[],left:[]})
  }

  export const getDataPersentage = (leftPerFood) => {
    if(leftPerFood && leftPerFood.length>0){
      const totalLeft = leftPerFood.reduce((acc,cur)=>{
        acc+=cur;
        return acc
      },0)
      return leftPerFood.map(left=>(
        (left/totalLeft*100).toFixed(2)
      ))
    } else {
      return []
    }

  }
