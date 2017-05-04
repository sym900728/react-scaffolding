# Description

I will list many problems that I suffered from the react project.

## Tools

### node

It used the node environment to develop react project.



### npm

### yarn

### babel

### webpack

### eslint

When the project is growing up and many people develop single project, many people have many code styles, but it should be uniform. 
Also many people have many error code.
Using the eslint to unify the code style and check the code.

The eslint with the react project will use these modules.

```
    "eslint": "^3.19.0",
    "eslint-config-standard": "^10.2.1",
    "eslint-config-standard-react": "^5.0.0",
    "eslint-plugin-babel": "^4.1.1",
    "eslint-plugin-import": "^2.2.0",
    "eslint-plugin-node": "^4.2.2",
    "eslint-plugin-promise": "^3.5.0",
    "eslint-plugin-react": "^6.10.3",
    "eslint-plugin-standard": "^3.0.1"
```

It has been list in the package.json

#### 1. Don't want to lint the files under some folders?
Using the .eslintignore file to not lint the files.

#### 2. Don't want to use some rules, or want to close/disable some rules?
Using the .eslintrc file to configure rules to open or close some rules.

```
"rules": {
    "max-len": [2, 120, 2],
    "object-property-newline": [0],
    "no-var": [2],
    "react/prop-types": [0]
}
```

#### 3. How to use eslint in the WebStorm?
![webstorm-eslint-config.png](https://github.com/sym900728/LockPattern/blob/master/documents/images/webstorm-eslint-config.png)



If you want to learn more, you can visit the [eslint](http://eslint.org/)


## React Redux

### Description



## React Components

## Optimize

