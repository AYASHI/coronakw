## To mark a string as translatable:

1. Import:
    ```javascript
    import {useTranslation} from 'react-i18next';
    ```
  

2. Within the component:
    ```javascript
    const {t, i18n} = useTranslation();
    ```
    
3. Whenever adding a string, instead of:
    ```html
    <Text>Homepage Title</Text>
    ```
    ```html
    <Text>{t('home.titleText')}</Text>
    ```

4.  Add the translation key in the ar-translations.json and en-translations.json files

    ```javascript
    {
        "home":
            {
                "titleText": "Homepage Title"
            }
    }
    ```