# FormBus

FormBus might be what you are looking for if you do server-side form validation, and you want a plug and play front-end solution to do the typical.

You can use the built-in directives to show or toggle CSS class names when the fields validation failed, or when the submission was successful, or something went wrong.

In the WordPress context, when you are using a forms plugin, FormBus is for you when:

1. The generated HTML structure does not suit your needs, or you are using utility-first CSS frameworks like Tailwind CSS, and you wish to use those class names
2. You are deep into the rabbit hole of front-end optimization, and you don't want any bloated libraries or dependencies that you are not using anywhere else, like jQuery
3. You are using WordPress as a headless CMS, and you are using the REST API as a primary way to interact with it

## Usage

### Installation

The recommended way of installing FormBus is using npm:

```shell script
npm install formbus
```

If you are not using a bundler (webpack, Parcel, etc.), you can download the UMD version from here. This version contains polyfills, and it's compatible with Internet Explorer 11.

### Submitting your `form`

As long as your `form` element is set up correctly:

1. `action` is pointing to the API endpoint
2. `method` is set to to `post`
3. input elements have the `name` attribute

FormBus is able to construct the request and send it. It uses `Fetch API`, and the data is constructed using `FormData`.

If you need to set additional configuration values, for example, headers, you can use the configuration object. It's explained later in the documentation.

```html
<form action="https://your-website.com/wp-json/contact-form-7/v1/contact-forms/<ID>/feedback"
      method="post"
      id="contact-form">
    <div class="form-group">
        <label for="name">Your Name</label>
        <input type="text" name="your-name" class="form-control" id="name">
    </div>
    <!-- Other input elements -->
    <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

In your JavaScript file, import the corresponding function for the service.
The first argument should be a CSS selector matching the `form` element or a parent, wrapper element.

The selector expects a single element; if multiple are matched, only the first one is used.

```js
import { contactForm7Bus } from 'formbus';

const contactFormBus = contactForm7Bus('form#contact-form');
```

Or you can pass a `HTMLElement` directly:

```js
const contactFormWrapper = document.querySelector('section#contact-form-section');
const contactFormBus = contactForm7Bus(contactFormWrapper);
```

You have to call the `init` method explicitly for the initialization:

```js
contactFormBus.init();
```

Later on, you can call `destroy` if you want to remove the events attached to the form:

```js
contactFormBus.destroy();
```

#### With multiple `form` elements

If you want to target multiple elements on the page, first get the elements, and then loop over them:

```js
const forms = document.querySelectorAll('form');

forms.forEach(form => {
    const cf7FormBus = contactForm7Bus(form);

    cf7FormBus.init();
});
```

#### Supported services

##### [Contact Form 7](https://contactform7.com/)

> Just another contact form plugin for WordPress. Simple but flexible.

```js
import { contactForm7Bus } from 'formbus';
```

The REST API endpoint, if not altered, should look like this:

```txt
https://your-website.com/wp-json/contact-form-7/v1/contact-forms/<ID>/feedback
```

##### [Gravity Forms](https://www.gravityforms.com/)

> Gravity Forms is the Easiest, Most Trusted Tool to Create Advanced Forms for Your WordPress-Powered Website.

```js
import { gravityFormsBus } from 'formbus';
```

The REST API endpoint, if not altered, should look like this:

```txt
https://your-website.com/wp-json/gf/v2/forms/<ID>/submissions
```

##### Your service

FormBus is extensible; as long as the endpoint returns validation errors for the fields and can infer the submission state, you should be able to us with your service. More about this later.

### Events

Events are attached to the `form` element.

#### `afterFormBusResponse`

```js
const contactForm = document.querySelector('#contact-form');
const contactFormBus = contactForm7Bus(contactForm);

contactFormBus.init();

contactForm.addEventListener('afterFormBusResponse', ({ detail: response }) => {
    console.log(response);
});
```

This custom event is fired after the form submission when a response is returned.

The event's detail contains the raw response object. The format and the returned data that depends on the service.

##### Response helper functions

Because the response differs from service to service, FormBus provides a set of helper functions that you can use instead of writing logic that is bound to a specific service.

The following methods are accessible under the `responseHelpers` key:

- `getFieldValidationErrorMessage(responseData, fieldName)`
- `getFormSubmissionErrorMessage(responseData)`
- `getFormSubmissionSuccessMessage(responseData)`
- `getFormValidationErrorMessage(responseData)`
- `isFieldValidationError(responseData, fieldName)`
- `isFormSubmissionError(responseData)`
- `isFormSubmissionSuccess(responseData)`
- `isFormValidationError(responseData)`

Here's an example where it replaces the `form` element with the success message:

```js
contactForm.addEventListener('afterFormBusResponse', ({ detail: response }) => {
    const helpers = contactFormBus.responseHelpers;

    if (!helpers.isFormSubmissionSuccess(response)) {
        alert('Something went wrong.');
        return;
    }

    const successMessage = helpers.getFormSubmissionSuccessMessage(response);

    contactFormBus.destroy();
    contactForm.innerHTML = `<p>${successMessage}</p>`;
});
```

#### `beforeFormBusRequest`

```js
contactForm.addEventListener('beforeFormBusRequest', ({ detail: formData }) => {
    console.log(formData);
});
```

The custom event's detail contains the `FormData` that is sent with the request.

### Directives

With the helper functions, you get a lot of flexibility, but you still have to act on different states.

Directives are useful when you want to have what is expected.

Just add one of the attributes to an element, and FormBus will do the rest.

Depending on your case, you can use only one directive or all of them.

```diff
<form action="https://your-website.com/wp-json/contact-form-7/v1/contact-forms/43/feedback"
      method="post"
      id="contact-form"
+     form-validation-error-class
+     form-submission-success-class>

+   <div form-validation-error-message></div>
+   <div form-submission-success-message></div>

+   <div class="form-group" field-validation-error-class="your-name">
        <label for="name">Your Name</label>
        <input type="text" name="your-name" class="form-control" id="name">
+       <div field-validation-error-message="your-name"></div>
    </div>
    <!-- Other input elements -->
    <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

- `field-validation-error-class`
- `field-validation-error-message`
- `form-submission-error-class`
- `form-submission-error-message`
- `form-submission-success-class`
- `form-submission-success-class`
- `form-validation-error-class`
- `form-validation-error-message`

## Configuration

You can overwrite the default configuration by passing an object as the second argument.

```js
const yourConfig = {
    classNames: {
        fieldValidationError: '--is-error'
    }
};
const contactFormBus = contactForm7Bus('#contact-form', yourConfig);
```

Configuration values are merged with the defaults. If you want to overwrite a few of them, you don't have to provide the entire configuration object.

**The default configuration:**

```js
const defaultConfig = {
    directives: {
        fieldValidationErrorClassNames: 'field-validation-error-class',
        fieldValidationErrorMessage: 'field-validation-error-message',
        formSubmissionErrorClassNames: 'form-submission-error-class',
        formSubmissionErrorMessage: 'form-submission-error-message',
        formSubmissionSuccessClassNames: 'form-submission-success-class',
        formSubmissionSuccessMessage: 'form-submission-success-message',
        formValidationErrorClassNames: 'form-validation-error-class',
        formValidationErrorMessage: 'form-validation-error-message'
    },
    classNames: {
        fieldValidationError: 'is-error is-field-validation-error',
        formSubmissionError: 'is-error is-form-submission-error',
        formSubmissionSuccess: 'is-success is-form-submission-success',
        formValidationError: 'is-error is-form-validation-error'
    },
    request: {}
};
```

### Customizing the directive attributes

```js
const yourConfig = {
    directives: {
        fieldValidationErrorClassNames: 'data-field-error-class',
        fieldValidationErrorMessage: 'data-field-error-message'
    }
};
```

```diff
<form action="https://your-website.com/wp-json/contact-form-7/v1/contact-forms/43/feedback"
      method="post"
      id="contact-form">
-   <div class="form-group" field-validation-error-class="your-name">
+   <div class="form-group" data-field-error-class="your-name">
        <label for="name">Your Name</label>
        <input type="text" name="your-name" class="form-control" id="name">
-       <div field-validation-error-message="your-name"></div>
+       <div data-field-error-message="your-name"></div>
    </div>
    <!-- Other input elements -->
    <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

## Use your service

Instead of service functions, use the `formBus` that expects to receive response helpers' implementation as the second argument:

```js
import { formBus } from 'formbus';

const contactFormBus = formBus('#contact-form', serviceResponseHelpers);

contactFormBus.init();
```

You are expected to return a `string` or a `null` for these functions:

- `getFieldValidationErrorMessage`
- `getFormSubmissionErrorMessage`
- `getFormSubmissionSuccessMessage`
- `getFormValidationErrorMessage`

You are expected to return a `boolean` for the following:

- `isFieldValidationError`
- `isFormSubmissionError`
- `isFormSubmissionSuccess`
- `isFormValidationError`

```js
const getFieldValidationErrorMessage = (response, fieldName) => {
    return null;
};

const getFormSubmissionErrorMessage = (response) => {
    return null;
};

const getFormSubmissionSuccessMessage = (response) => {
    return null;
};

const getFormValidationErrorMessage = (response) => {
    return null;
};

const isFieldValidationError = (response, fieldName) => {
    return false;
};

const isFormSubmissionError = (response) => {
    return false;
};

const isFormSubmissionSuccess = (response) => {
    return false;
};

const isFormValidationError = (response) => {
    return false;
};

const serviceResponseHelpers = {
    getFieldValidationErrorMessage,
    getFormSubmissionErrorMessage,
    getFormSubmissionSuccessMessage,
    getFormValidationErrorMessage,
    isFieldValidationError,
    isFormSubmissionError,
    isFormSubmissionSuccess,
    isFormValidationError
};
```

The configuration object can be passed as the third argument.

```js
const contactFormBus = formBus('#contact-form', serviceResponseHelpers, yourConfig);
```

## Changelog

All notable changes to FormBus are documented in `CHANGELOG.md`.
