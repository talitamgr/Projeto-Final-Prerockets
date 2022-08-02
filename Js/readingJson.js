let data;
fetch('../data.json').then(response=>{
    data= response.json()
    return data
}).then(body=>{
    data = body.data
})