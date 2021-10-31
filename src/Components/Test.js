import { useEffect, useState } from "react";
const Test = () => {
    const [fn , setfn] = useState();
    
    if(fn) {
        console.log(fn(3));
    }
    useEffect(() => {
        const func = (x) => {
            return x + 2;
        }
        setfn(() => func);
    },[])
 return (
 <h1>hello</h1>
  )
}
export default Test;