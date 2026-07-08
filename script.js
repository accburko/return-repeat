const checkboxes =
    document.querySelectorAll(
        '.repeat-element input'
    );

const repeatButton =
    document.getElementById(
        'repeatButton'
    );

checkboxes.forEach(checkbox =>
{
    checkbox.addEventListener(
        'change',
        updateRepeatButton
    );
});

function updateRepeatButton()
{
    const checkedElements =
        document.querySelectorAll(
            '.repeat-element input:checked'
        );

    if(checkedElements.length > 0)
    {
        repeatButton.disabled = false;

        repeatButton.classList.add('active');
    }
    else
    {
        repeatButton.disabled = true;

        repeatButton.classList.remove('active');
    }
}