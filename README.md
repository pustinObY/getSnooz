#Recaldent

### Install package

```ssh
 npm install --global gulp
 npm install
```


### Run build project

```sh
  gulp
```

### SASS folder

* `mixins` holds all Sass/SCSS mixins, FastShell ships with a few helpers
* `module` holds modules, more Object-Orientated components and a generic `app.scss` for everything else, all file names should be modular/OO.
* `partials` holds the blueprints for the project, the header, footer, sidebar and so on.
* `vendor` holds any files that are third party, such as the font awesome icons CSS
* `style.scss` imports all the necessary files from the above folders, when adding new files be sure to add it inside this file.

  - Test http://localhost:3000
  - Browers option http://localhost:3001
