# EASY RESULT
Easy Result is a TypeScript error-handling library that simplifies error identification and resolution in applications. It uses the "biased eithers" approach, but unlike other functional programming libraries that follow the "left" and "right" conventions, Easy Result uses "success" and "failure" terms that make it easier to use for developers with different levels of functional programming knowledge. Additionally, by focusing solely on implementing "either", Easy Result is lighter weight than other functional programming alternatives.


## ADVANTAGES OF USING EITHER TYPES FOR ERROR HANDLING


### - Return type for errors

 Unlike other languages, TypeScript does not have a return type for errors. Let's consider the following function as an example:
  ```typescript
  function getPokemons(): Promise<Pokemon[]> {
   try{
    return await axios.get("pokemons")
   } catch{
    throw CustomPokemonError;
   }
  }
```
As we can see, TypeScript is great, and we know that this function returns a list of Pokemons. However, it's not always the case, sometimes we return a CustomPokemonError which is not evident in the consuming code. Here's a possible solution using Easy Result:

  ```typescript
  function getPokemons(): AsynResult<CustomPokemonError, Pokemon[]> {
   try{
    return Result.create(await axios.get("pokemons"))
   } catch{
    return Failure.create(CustomPokemonError)
   }
  }
```
Now the function returns a typed error and we know what the function will return at each possible step.

### It forces us to handle the error.

It's very common that when we throw an error (if we're lucky enough to do so), we never handle it and assume that everything went well.

```typescript
function getPokemons(): Promise<Pokemon[]> {
   try{
    return await axios.get("pokemons")
   } catch{
    throw CustomPokemonError;
   }
  }
const result = await  this.getPokemons() //We end up making calls that assume everything went well, when it's not necessarily the case.
```

On the other hand, by using AsyncResult we are forced to verify that everything went well, since otherwise the typing of Typescript will not allow it.

  ```typescript
function getPokemons(): AsynResult<CustomPokemonError, Pokemon[]> {
   try{
    return Result.create(await axios.get("pokemons"))
   } catch{
    return Failure.create(CustomPokemonError)
   }
  }
  const result = await getPokemons() // This is not of type "list of pokemons", instead it says it's of type "pokemon list" or "error", which forces us to verify.

  if(Success.check(result)) {
    result.value //After passing the verification, our editor will not throw an error if we try to access the value. On the contrary, if we try to access it before the verification, it will throw an error
  } else {
    result.error
  }
```

### Don't use exceptions for things that are NOT exceptions. 
Exceptions are for exceptional cases, an incorrect input from a user is not exceptional, it is expected, so why use exceptions?

```typescript
function validateForm(name) {
    if(/[0-9]/.test(name)){
        throw "the name must be a number"
    }
    return true
}
```
This is not an exceptional case, it is something expected, so why throw an exception?

```typescript
function validateForm(name)Result<string, boolean> {
    if(/[0-9]/.test(name)){
        return Failure.create("the name must be a number")
    }
    return Success.create(true)
}
```

### Allows to handle more than one error at a time

When we throw an exception with throw, we interrupt the execution flow, which doesn't make sense if we want to return different errors. With easy-result, it's possible.

```typescript
function validateForm(name)Result<string[], boolean> {
    const errors = [];
    if(/[0-9]/.test(name)){
        errors.push("the name bust be a number")
    }
    if(address.length < 1000) {
        error.push("the max length of address must be 999")
    }
    return errors.length 
        ? Failure.create(errors)
        : Success.create(true)
}
```

## HOW TO USE
Insttall using 
```
npm i easy-result
```

Import from the easy-result package whatever we need to use.

```typescript
import { Success, Failure } from 'easy-result'
import type { Result, AsyncResult } from 'easy-result'
```
### Create an error
``` typescript
Failure.create(error)
```
### Create a success case
``` typescript
Success.create(data)
```
### Check if a result is successful
``` typescript
if(Success.check(result)) {
    // el resultado es exitoso
}
```
### Check if a result is a failure
``` typescript
if(Failure.check(result)) {
    el resultado es fallido
}
```
### Get the error from a failure
``` typescript
if(Failure.check(result)) {
    result.error
}
```

### Get the data from a success
``` typescript
if(Success.check(result)) {
    result.value
}
```

A variable of type Result will not have the field "error" if it is a Success, or the field "value" if it is an Error. TypeScript and your editor take care to ensure that you handle it correctly.

