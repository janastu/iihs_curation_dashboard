export class JsonConvert { 

constructor(){}

parseJSON = (text) => {

  let quoteKeysAndParse = (text) => {
           //Quote keys in objects
     //let quoted = text.replace(/([\{\[,]\s*)(['"])?([a-zA-Z0-9_]+)(['"])?\s*:/g, '$1"$3": ');
     let quoted = text.replace(/^\s*(\w+)\s*:/gm, '"$1":');
     //Remove the "last item" text
     quoted = quoted.replace(/,\s+'' \/\/ Last item[^\]^}]+([\]\}])/g, '$1');
     //Remove improperly escaping of apostrophes
     quoted = quoted.replace(/([^\\])\\'/g, '$1\'');
     //Parse the JSON
     console.log(quoted);

     return JSON.parse(quoted);
  }
  
  //Find var declarations
  let declarations = text.match(/var\s+_nr_[^\s]+\s+=\s+/ig), obj = {}, key = null, prevKey = null;
  text = ['',text];
  //For each variable...
  for(let declaration of declarations){
    key = declaration.match(/_nr_[^\s]+/)[0];
    let currentText = text[1].split(declaration);
    text = currentText;
    if(prevKey){
      //Parse the prior split section

      obj[prevKey] = quoteKeysAndParse(text[0]);
    }
    prevKey = key;
  }
  
  //Make sure we process the last section
  if(prevKey){
    obj[prevKey] = quoteKeysAndParse(text[1]);
  }
 
  return obj;
}
}