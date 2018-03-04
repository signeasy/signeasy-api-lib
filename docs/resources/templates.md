## Templates

- [getAllTemplates()](#getalltemplates)
- [getTemplate()](#gettemplate)

### getAllTemplates

Returns all the templates available under the given user account.

**Usage**

```
apiClient.getAllTemplates((err, templates) => {
  if (err) {
    throw err;
  }

  console.log('Got all templates', templates);
})
```


### getTemplate

Returns the specific template details by the template id;

**Usage**

```
apiClient.getTemplate(templateId, (err, template) => {
  if (err) {
    throw err;
  }

  console.log('Got template details', template);
})
```
