 
  let dropdown = (function() {

    let target = document.getElementById('organization');
    let dropdownBlock = document.getElementById('organization-wrapper');
    let option = document.getElementsByClassName('select-one');
    let value = document.getElementById('value');
    

    let _toggleDropdown = function() {
        dropdownBlock.classList.toggle('open');
    }

    let _toggleClass = function(e) {
        content = e.target.innerHTML;
        value.innerHTML = content;
        for (var i = 0; i < option.length; i++) { 
            if(option[i] == e.target) {
                e.target.classList.add('form__option--active');
            } else {
                option[i].classList.remove('form__option--active');
            }
        }
    }

    let addListeners = function() {
        target.addEventListener('click', _toggleDropdown);
        for (var i = 0; i < option.length; i++) { 
            option[i].addEventListener('click', _toggleClass);
        }
    }

    return {
        openDropdown: addListeners
      };

  })();

  dropdown.openDropdown();

  let dropdown2 = (function() {

    let target = document.getElementById('surgery');
    let dropdownBlock = document.getElementById('surgery-wrapper');
    let option = document.getElementsByClassName('select-two');
    let value = document.getElementById('value2');
    

    let _toggleDropdown = function() {
        dropdownBlock.classList.toggle('open');
    }

    let _toggleClass = function(e) {
        content = e.target.innerHTML;
        value.innerHTML = content;
        for (var i = 0; i < option.length; i++) { 
            if(option[i] == e.target) {
                e.target.classList.add('form__option--active');
            } else {
                option[i].classList.remove('form__option--active');
            }
        }
    }

    let addListeners = function() {
        target.addEventListener('click', _toggleDropdown);
        for (var i = 0; i < option.length; i++) { 
            option[i].addEventListener('click', _toggleClass);
        }
    }

    return {
        openDropdown: addListeners
      };

  })();

  dropdown2.openDropdown();