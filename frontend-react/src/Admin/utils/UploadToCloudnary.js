export const uploadToCloudinary = async (pics) => {
    
    if (pics) {

       
      
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "Community-cart-social");
      data.append("cloud_name", "di6dk4aug");
  
      const res = await 
      fetch(`https://api.cloudinary.com/v1_1/di6dk4aug/image/upload`, {
        method: "post",
        body: data,
      })
        
        const fileData=await res.json();
        console.log("url : ", fileData);
        return fileData.url
  
    } else {
      console.log("error");
    }
  };