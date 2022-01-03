(function() {
  let uploadedFileId;
  let isRequestHandled = false;

  function makeRequest(method, url, data) {
    const options = {
      method,
      credentials: 'same-origin'
    };

    if (data) {
      if (data instanceof FormData) {
        options.body = data;
      } else {
        options.body = JSON.stringify(data);
        options.headers = new Headers({
          'Content-Type': 'application/json'
        });
      }
    }

    return window.fetch(url, options).then(res => res.json());
  }

  function handleError() {
    window.location = '/';
  }

  function handleRequest(element) {
    if (!isRequestHandled) {
      isRequestHandled = true;
      element.classList.add('is-loading');
    } else {
      isRequestHandled = false;
      element.classList.remove('is-loading');
    }
  }

  document.addEventListener('click', e => {
    if (isRequestHandled) {
      return;
    }

    if (e.target.classList.contains('js-uploadBtn')) {
      const file = document.querySelector('.js-fileInput').files[0];
      const formdata = new FormData();
      formdata.append('document', file);

      handleRequest(e.target);
      makeRequest('POST', '/api/upload', formdata).then(response => {
        if (response.error) {
          handleError();
        } else {
          uploadedFileId = response.result.id;
          document
            .querySelector('.js-uploadWrapper')
            .classList.add('is-hidden');
          document
            .querySelector('.js-uploadResponseWrapper')
            .classList.remove('is-hidden');
          document.querySelector('.js-rsWrapper').classList.remove('is-hidden');
          document.querySelector('.js-fileName').innerText =
            response.result.name;
          document
            .querySelector('.js-signLink')
            .setAttribute('href', response.result.url);
        }

        handleRequest(e.target);
      });
    } else if (e.target.classList.contains('js-createRs')) {
      handleRequest(e.target);
      const emails = document
        .querySelector('.js-recipientInput')
        .value.split(',');
      const data = {
        recipients: emails.map(em => {
          return {
            email: em,
            first_name: '',
            last_name: ''
          };
        }),
        original_file_id: uploadedFileId,
        is_ordered: 1
      };

      makeRequest('POST', '/api/create-rs', data).then(response => {
        handleRequest(e.target);
        e.target.remove();
        document
          .querySelector('.js-createRsResponse')
          .classList.remove('is-hidden');
      });
    } else if (e.target.classList.contains('js-remindRs')) {
      const parentRow = e.target.closest('tr');
      const fileId = parentRow.dataset.id;
      parentRow.querySelector('.js-infoText').innerText =
        'Reminders sent successfully';
      e.target.remove();

      makeRequest('GET', `/api/remind-rs?fileId=${fileId}`).then(response => {
        console.log('Got response', response);
      });
    } else if (e.target.classList.contains('js-cancelRs')) {
      const parentRow = e.target.closest('tr');
      const fileId = parentRow.dataset.id;
      parentRow.querySelector('.js-infoText').innerText =
        'Request signature cancelled';
      parentRow.querySelector('.buttons').remove();

      makeRequest('GET', `/api/cancel-rs?fileId=${fileId}`).then(response => {
        console.log('Got response', response);
      });
    } else if (e.target.classList.contains('js-declineRs')) {
      const parentRow = e.target.closest('tr');
      const fileId = parentRow.dataset.id;
      parentRow.querySelector('.js-infoText').innerText =
        'Request signature declined';
      e.target.remove();

      makeRequest('GET', `/api/decline-rs?fileId=${fileId}`).then(response => {
        console.log('Got response', response);
      });
    }
  });
})();
