export function validateTextField(value, lengthMin=3, lengthMax=30, regExp){
  if((value.trim().length < lengthMin) || (value.trim().length > lengthMax )) {
    const message =`${value} length is not between ${lengthMin} and ${lengthMax}`;
    console.log(message);
    return { error : message };
  }
  if(regExp && !regExp.test(value)) {
    const message = `${value} expression is not correct`;
    console.log(message);
    return { error : message };
  }
  return true;
}

