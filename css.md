## why css-variables

css classes are similar to classes in programming languages. 
In css, classes are extended, overidded through class specificity. Its based on 
- order in which the classes are declared in the file and
- where its defined in the dom heirarchy

This type of class inheritance causes lot of confusion as which class overides which when they are defined together.

To avoid this, css-variables was introduced which is based out of class composition rather than inheritance
This allow us to define two classes
- Base Class having css-variables defined
- Custom class which would compose with the base class

Eg: 
```

.base_class {
  color: var(--color)
}

.red {
  --color: red
};

.green {
  --color: green
}

<div class='base_class red'>
  red
</div>

<div class='base_class green'>
  green
</div>

<div class='green'>
  <div class='base_class red'>
    red
  </div>
  <div class='base_class'>
    green
  </div>
</div>

```
Now classes are independent of the declaration order. and our mental model of declaring class should favour
composability over inheritance

Although, in the 2nd example. `green` is applied due to inheritance. we should avoid that kind of declaration. 
class composition should be on the same element. ie. base class and other composing class should be defined togther. 

To Ensure this practice, we need to create composing classes related in names with base class so we know what classes
can be composed. To acheive this we follow the BEM convention for composing classes

Eg:
```
/* x--modifier */
.app-container--single {
  --coll: 1fr;
  --rows: 56px 1fr;
  --areas: 
    "header" 
    "main" 
}
/*Block */
.app-container {
  position: relative;
  height: 100vh;
  width: 100vw;
  font-family: 'Roboto', sans-serif;

  display: grid;
  grid-template-columns: var(--coll, 256px 1fr);
  grid-template-rows: var(--rows, 56px 1fr);
  grid-template-areas: var(--areas, "header header" "nav main")

}

/*Element: --element*/
.app__header { grid-area: header; }
.app__nav { grid-area: nav; }
.app__main { grid-area: main; }
```
Mostly, the application should only add different modifiers to get different types of UI. This way we can 
- define css clearly, know what a class does
- know what classes goes togther 
- compose classes without worrying about overrides, re-use css

> Tip: Name class based on the UI representation rather than application representation. Ie. Dont declare any styles 
for app class names. 
```
.person-container {
  /*not preferred*/
}

.card  {
/*preferred*/
}

<div class='card person'> 
```
Only `card` has styles. `person` class is only for js purposes.






