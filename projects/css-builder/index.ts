import { readFileSync, writeFileSync, mkdirSync } from 'fs';

const cssPath = '../NgMaterialApp/dist/ng-material-app/styles.css';


let cssParts = readFileSync(cssPath, { encoding: 'utf-8' })
    .split(/(\/\*\!\*\*)|(\*\*\*\/\n)/g)
    .filter(i => !!i)
    .filter(i => !i.startsWith('/*!*'))
    .filter(i => !i.startsWith('***'))
    ;

let coreCss = cssParts[0];
let lightCss = cssParts[1];
let darkCss = cssParts[2];




const colorMap = {
    'mdc-theme-primary': {
        placeholder: '020000',
        default: '#0000ff',
    },
    'mdc-theme-primary--contrast': {
        placeholder: '02c000',
        default: '#000033',
    },
    'mdc-theme-secondary': {
        placeholder: '120000',
        default: '#00ff00',
    },
    'mdc-theme-secondary--contrast': {
        placeholder: '12c000',
        default: '#003300',
    },
    'mdc-theme-error': {
        placeholder: '320000',
        default: '#ff0000',
    },
    'mdc-theme-error--contrast': {
        placeholder: '32c000',
        default: '#330000',
    },

    'mat-theme-background--status-bar': {
        placeholder: 'f00000',
        default: 'black',
    },
    'mat-theme-background--app-bar': {
        placeholder: 'f00001',
        default: '#212121',
    },
    'mat-theme-background': {
        placeholder: 'f00002',
        default: '#303030',
    },
    'mat-theme-background--hover': {
        placeholder: 'f00003',
        default: 'rgba(255, 255, 255, 0.04)',
    },
    'mat-theme-background--card': {
        placeholder: 'f00004',
        default: 'var(--mdc-theme-surface, #424242)',
    },
    'mat-theme-background--dialog': {
        placeholder: 'f00005',
        default: 'var(--mdc-theme-surface, #424242)',
    },
    'mat-theme-background--disabled-button': {
        placeholder: 'f00006',
        default: 'rgba(255, 255, 255, 0.12)',
    },
    'mat-theme-background--raised-button': {
        placeholder: 'f00007',
        default: 'var(--mdc-theme-surface, #424242)',
    },
    'mat-theme-background--focused-button': {
        placeholder: 'f00008',
        default: 'rgba(255, 255, 255, 0.12)',
    },
    'mat-theme-background--selected-button': {
        placeholder: 'f00009',
        default: '#212121',
    },
    'mat-theme-background--selected-disabled-button': {
        placeholder: 'f00010',
        default: 'var(--mdc-theme-surface, #424242)',
    },
    'mat-theme-background--disabled-button-toggle': {
        placeholder: 'f00011',
        default: 'black',
    },
    'mat-theme-background--unselected-chip': {
        placeholder: 'f00012',
        default: '#616161',
    },
    'mat-theme-background--disabled-list-option': {
        placeholder: 'f00013',
        default: 'rgba(255, 255, 255, 0.12)',
    },
    'mat-theme-background--tooltip': {
        placeholder: 'f00014',
        default: '#616161',
    },

    'mat-theme-foreground--base': {
        placeholder: 'ff0000',
        default: 'white',
    },

    'mat-theme-foreground--divider': {
        placeholder: 'ff0001',
        default: 'rgba(255, 255, 255, 0.12)',
    },
    'mat-theme-foreground--dividers': {
        placeholder: 'ff0002',
        default: 'var(--mat-theme-foreground--divider, rgba(255, 255, 255, 0.12))',
    },
    'mat-theme-foreground--disabled': {
        placeholder: 'ff0003',
        default: 'rgba(255, 255, 255, 0.5)',
    },
    'mat-theme-foreground--disabled-button': {
        placeholder: 'ff0004',
        default: 'rgba(255, 255, 255, 0.3)',
    },
    'mat-theme-foreground--disabled-text': {
        placeholder: 'ff0005',
        default: 'rgba(255, 255, 255, 0.5)',
    },
    'mat-theme-foreground--hint-text': {
        placeholder: 'ff0007',
        default: 'rgba(255, 255, 255, 0.5)',
    },
    'mat-theme-foreground--secondary-text': {
        placeholder: 'ff0008',
        default: 'rgba(255, 255, 255, 0.7)',
    },
    'mat-theme-foreground--icon': {
        placeholder: 'ff0009',
        default: 'white',
    },
    'mat-theme-foreground--icons': {
        placeholder: 'ff0010',
        default: 'var(--mat-theme-foreground--icon, white)',
    },
    'mat-theme-foreground--text': {
        placeholder: 'ff0011',
        default: 'white',
    },
    'mat-theme-foreground--slider-min': {
        placeholder: 'ff0012',
        default: 'white',
    },
    'mat-theme-foreground--slider-off': {
        placeholder: 'ff0013',
        default: 'rgba(255, 255, 255, 0.3)',
    },
    'mat-theme-foreground--slider-off-active': {
        placeholder: 'ff0014',
        default: 'rgba(255, 255, 255, 0.3)',
    },
    
    //b0b0b0
    /*'mat-theme-background--disabled': {
        placeholder: 'b0b0b0',
        default: '#686868',

    },*/

}


// 'var(--mdc-theme-primary, #020000)' = > var(--mdc-theme-primary, #020000)
// '#020000' = > var(--mdc-theme-primary)

for (const varName in colorMap) {
    const cm = colorMap[varName];

    let find = `var(--${varName}, #${cm.placeholder})`;
    let replace = `var(--${varName}, ${cm.default})`;

    lightCss = lightCss.replaceAll(find, replace);

    find = `#${cm.placeholder}`;
    replace = `var(--${varName}, ${cm.default})`;

    lightCss = lightCss.replaceAll(find, replace);

}

mkdirSync('./dist', { recursive: true });

writeFileSync('./dist/mat-core.css', coreCss, { encoding: 'utf-8' });
writeFileSync('./dist/mat-theme.css', lightCss, { encoding: 'utf-8' });


