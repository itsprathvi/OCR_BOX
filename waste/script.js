window.onload = function() {
    let crop = document.querySelector('.crop');
    // adding a listner for the crop button 
    crop.addEventListener('click', displayGrid);
    let save = document.querySelector('.save');
    // document.getElementById("image").style.clip="rect(0px,60px,60px,0px)";
    save.addEventListener('click', saveCoordinates);
    ResizeDiv();

}

// defining the save button functionality
function saveCoordinates() {
    // the following are the coordinate values of the grid 
    //these are for testing and experimentation purpose 
    const grid = document.querySelector('.grid');
    const topleft_X = grid.getBoundingClientRect().left;
    const topleft_Y = grid.getBoundingClientRect().top;
    const topright_X = topleft_X + grid.getBoundingClientRect().width;
    const topright_Y = topleft_Y;
    const bottomleft_X = topleft_X;
    const bottomleft_Y = grid.getBoundingClientRect().bottom;
    const bottomright_X = topright_X;
    const bottomright_Y = bottomleft_Y;
    console.log(topleft_Y, topright_X, bottomright_X, bottomleft_Y);
    // selects the image which as to be cropped
    let image = document.querySelector('.image');
    //makes the cropped image visible only when the done button is clicked
    image.style.visibility = 'visible';
    //  this is the formula used to crop the image - the coordinates are obtained from the above experimented values
    image.style.clip = "rect(" + (topleft_Y - 50) + 'px,' + (grid.getBoundingClientRect().width) + 'px,' + (bottomleft_Y) + 'px,' + (topleft_X - 20) + 'px)';

}


// defining the function passed as argunment to listner - toggles grid visibility and changes the button names
function displayGrid() {

    // changing the text inside the crop button to cancel
    if (document.querySelector('.crop').innerHTML === "cancel") {
        document.querySelector('.crop').innerHTML = "crop";
        let image = document.querySelector('.image');
        image.style.visibility = 'hidden';
    } else
        document.querySelector('.crop').innerHTML = "cancel"
        // defining the save button visibility
    let save = document.querySelector('.save');
    if (save.style.visibility === 'visible')
        save.style.visibility = 'hidden';
    else
        save.style.visibility = 'visible';
    // defining the grid box visibility
    let view = document.querySelector('.grid');
    console.log(view.getBoundingClientRect());
    if (view.style.visibility === "visible")
        view.style.visibility = "hidden";
    else
        view.style.visibility = "visible";
    // defining the grid lines visibility
    let view2 = document.querySelectorAll('.grid>div');
    view2.forEach(function(a) {
        if (a.style.visibility === "visible")
            a.style.visibility = "hidden";
        else
            a.style.visibility = "visible";
    });
    //   defining the corners visibility
    let view3 = document.querySelectorAll('.grid>div>div');
    view3.forEach(function(b) {
        if (b.style.visibility === "visible")
            b.style.visibility = "hidden";
        else
            b.style.visibility = "visible";
    });
}


// the following function resizes the div based on the mouse click and move events
function ResizeDiv() {
    const grid = document.querySelector('.grid');
    const corners = document.querySelectorAll('.grid>div>div');
    let initial_width = 0;
    let initial_height = 0;
    let initial_x = 0;
    let initial_y = 0;
    let initial_mouse_x = 0;
    let initial_mouse_y = 0;
    for (let i = 0; i < corners.length; i++) {
        const corner = corners[i];
        corner.addEventListener('mousedown', function(e) {
            e.preventDefault()
            initial_width = parseFloat(getComputedStyle(grid, null).getPropertyValue('width').replace('px', ''));
            initial_height = parseFloat(getComputedStyle(grid, null).getPropertyValue('height').replace('px', ''));
            initial_x = grid.getBoundingClientRect().left;
            initial_y = grid.getBoundingClientRect().top;
            grid_x = grid.getBoundingClientRect().left;
            grid_y = grid.getBoundingClientRect().top;
            initial_mouse_x = e.pageX;
            initial_mouse_y = e.pageY;
            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResize);
        });


        function resize(e) {
            if (corner.classList.contains('bottomrightmark')) {
                const width = initial_width + (e.pageX - initial_mouse_x);
                const height = initial_height + (e.pageY - initial_mouse_y)
                grid.style.width = width + 'px';
                grid.style.height = height + 'px';
            } else if (corner.classList.contains('bottomleftmark')) {
                const height = initial_height + (e.pageY - initial_mouse_y)
                const width = initial_width - (e.pageX - initial_mouse_x)
                grid.style.height = height + 'px';
                grid.style.width = width + 'px';
                grid.style.left = initial_x + (e.pageX - initial_mouse_x) + 'px'
            } else if (corner.classList.contains('toprightmark')) {
                const width = initial_width + (e.pageX - initial_mouse_x)
                const height = initial_height - (e.pageY - initial_mouse_y)
                grid.style.width = width + 'px';

                grid.style.height = height + 'px';
                grid.style.top = initial_y + (e.pageY - initial_mouse_y) + 'px';
            } else if (corner.classList.contains('topleftmark')) {
                const width = initial_width - (e.pageX - initial_mouse_x)
                const height = initial_height - (e.pageY - initial_mouse_y)
                grid.style.width = width + 'px'
                grid.style.left = initial_x + (e.pageX - initial_mouse_x) + 'px'
                grid.style.height = height + 'px'
                grid.style.top = initial_y + (e.pageY - initial_mouse_y) + 'px'

            } else if (corner.classList.contains('leftmark')) {
                const width = initial_width - (e.pageX - initial_mouse_x)
                grid.style.width = width + 'px';
                grid.style.left = initial_x + (e.pageX - initial_mouse_x) + 'px';
            } else if (corner.classList.contains('rightmark')) {
                const width = initial_width - (e.pageX - initial_mouse_x)
                grid.style.width = width + 'px';
                grid.style.left = initial_x + (e.pageX - initial_mouse_x) + 'px';

            } else if (corner.classList.contains('topmark')) {
                const height = initial_height - (e.pageY - initial_mouse_y);

                grid.style.height = height + 'px';
                grid.style.top = initial_y + (e.pageY - initial_mouse_y) + 'px';

            } else if (corner.classList.contains('bottommark')) {
                const height = initial_height + (e.pageY - initial_mouse_y);
                grid.style.height = height + 'px';
                //  grid.style.bottom = initial_y + height + pageXOffset;
            }
        }

        function stopResize() {
            window.removeEventListener('mousemove', resize);
        }
    }
}
window.onload = function() {
    let crop = document.querySelector('.crop');
    // adding a listner for the crop button 
    crop.addEventListener('click', displayGrid);
    let save = document.querySelector('.save');
    // document.getElementById("image").style.clip="rect(0px,60px,60px,0px)";
    save.addEventListener('click', saveCoordinates);
    ResizeDiv();

}

// defining the save button functionality
function saveCoordinates() {
    // the following are the coordinate values of the grid 
    //these are for testing and experimentation purpose 
    const grid = document.querySelector('.grid');
    const topleft_X = grid.getBoundingClientRect().left;
    const topleft_Y = grid.getBoundingClientRect().top;
    const topright_X = topleft_X + grid.getBoundingClientRect().width;
    const topright_Y = topleft_Y;
    const bottomleft_X = topleft_X;
    const bottomleft_Y = grid.getBoundingClientRect().bottom;
    const bottomright_X = topright_X;
    const bottomright_Y = bottomleft_Y;
    console.log(topleft_Y, topright_X, bottomright_X, bottomleft_Y);
    // selects the image which as to be cropped
    let image = document.querySelector('.image');
    //makes the cropped image visible only when the done button is clicked
    image.style.visibility = 'visible';
    //  this is the formula used to crop the image - the coordinates are obtained from the above experimented values
    image.style.clip = "rect(" + (topleft_Y - 50) + 'px,' + (grid.getBoundingClientRect().width) + 'px,' + (bottomleft_Y) + 'px,' + (topleft_X - 20) + 'px)';


}


// defining the function passed as argunment to listner - toggles grid visibility and changes the button names
function displayGrid() {

    // changing the text inside the crop button to cancel
    if (document.querySelector('.crop').innerHTML === "cancel") {
        document.querySelector('.crop').innerHTML = "crop";
        let image = document.querySelector('.image');
        image.style.visibility = 'hidden';
    } else
        document.querySelector('.crop').innerHTML = "cancel"
        // defining the save button visibility
    let save = document.querySelector('.save');
    if (save.style.visibility === 'visible')
        save.style.visibility = 'hidden';
    else
        save.style.visibility = 'visible';
    // defining the grid box visibility
    let view = document.querySelector('.grid');
    console.log(view.getBoundingClientRect());
    if (view.style.visibility === "visible")
        view.style.visibility = "hidden";
    else
        view.style.visibility = "visible";
    // defining the grid lines visibility
    let view2 = document.querySelectorAll('.grid>div');
    view2.forEach(function(a) {
        if (a.style.visibility === "visible")
            a.style.visibility = "hidden";
        else
            a.style.visibility = "visible";
    });
    //   defining the corners visibility
    let view3 = document.querySelectorAll('.grid>div>div');
    view3.forEach(function(b) {
        if (b.style.visibility === "visible")
            b.style.visibility = "hidden";
        else
            b.style.visibility = "visible";
    });
}


// the following function resizes the div based on the mouse click and move events
function ResizeDiv() {
    const grid = document.querySelector('.grid');
    const corners = document.querySelectorAll('.grid>div>div');
    let initial_width = 0;
    let initial_height = 0;
    let initial_x = 0;
    let initial_y = 0;
    let initial_mouse_x = 0;
    let initial_mouse_y = 0;
    for (let i = 0; i < corners.length; i++) {
        const corner = corners[i];
        corner.addEventListener('mousedown', function(e) {
            e.preventDefault()
            initial_width = parseFloat(getComputedStyle(grid, null).getPropertyValue('width').replace('px', ''));
            initial_height = parseFloat(getComputedStyle(grid, null).getPropertyValue('height').replace('px', ''));
            initial_x = grid.getBoundingClientRect().left;
            initial_y = grid.getBoundingClientRect().top;
            grid_x = grid.getBoundingClientRect().left;
            grid_y = grid.getBoundingClientRect().top;
            initial_mouse_x = e.pageX;
            initial_mouse_y = e.pageY;
            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResize);
        });


        function resize(e) {
            if (corner.classList.contains('bottomrightmark')) {
                const width = initial_width + (e.pageX - initial_mouse_x);
                const height = initial_height + (e.pageY - initial_mouse_y)
                grid.style.width = width + 'px';
                grid.style.height = height + 'px';
            } else if (corner.classList.contains('bottomleftmark')) {
                const height = initial_height + (e.pageY - initial_mouse_y)
                const width = initial_width - (e.pageX - initial_mouse_x)
                grid.style.height = height + 'px';
                grid.style.width = width + 'px';
                grid.style.left = initial_x + (e.pageX - initial_mouse_x) + 'px'
            } else if (corner.classList.contains('toprightmark')) {
                const width = initial_width + (e.pageX - initial_mouse_x)
                const height = initial_height - (e.pageY - initial_mouse_y)
                grid.style.width = width + 'px';

                grid.style.height = height + 'px';
                grid.style.top = initial_y + (e.pageY - initial_mouse_y) + 'px';
            } else if (corner.classList.contains('topleftmark')) {
                const width = initial_width - (e.pageX - initial_mouse_x)
                const height = initial_height - (e.pageY - initial_mouse_y)
                grid.style.width = width + 'px'
                grid.style.left = initial_x + (e.pageX - initial_mouse_x) + 'px'
                grid.style.height = height + 'px'
                grid.style.top = initial_y + (e.pageY - initial_mouse_y) + 'px'

            } else if (corner.classList.contains('leftmark')) {
                window.onload = function() {
                    let crop = document.querySelector('.crop');
                    // adding a listner for the crop button 
                    crop.addEventListener('click', displayGrid);
                    let save = document.querySelector('.save');
                    // document.getElementById("image").style.clip="rect(0px,60px,60px,0px)";
                    save.addEventListener('click', saveCoordinates);
                    ResizeDiv();

                }

                // defining the save button functionality
                function saveCoordinates() {
                    // the following are the coordinate values of the grid 
                    //these are for testing and experimentation purpose 
                    const grid = document.querySelector('.grid');
                    const topleft_X = grid.getBoundingClientRect().left;
                    const topleft_Y = grid.getBoundingClientRect().top;
                    const topright_X = topleft_X + grid.getBoundingClientRect().width;
                    const topright_Y = topleft_Y;
                    const bottomleft_X = topleft_X;
                    const bottomleft_Y = grid.getBoundingClientRect().bottom;
                    const bottomright_X = topright_X;
                    const bottomright_Y = bottomleft_Y;
                    console.log(topleft_Y, topright_X, bottomright_X, bottomleft_Y);
                    // selects the image which as to be cropped
                    let image = document.querySelector('.image');
                    //makes the cropped image visible only when the done button is clicked
                    image.style.visibility = 'visible';
                    //  this is the formula used to crop the image - the coordinates are obtained from the above experimented values
                    image.style.clip = "rect(" + (topleft_Y - 50) + 'px,' + (grid.getBoundingClientRect().width) + 'px,' + (bottomleft_Y) + 'px,' + (topleft_X - 20) + 'px)';


                }


                // defining the function passed as argunment to listner - toggles grid visibility and changes the button names
                function displayGrid() {

                    // changing the text inside the crop button to cancel
                    if (document.querySelector('.crop').innerHTML === "cancel") {
                        document.querySelector('.crop').innerHTML = "crop";
                        let image = document.querySelector('.image');
                        image.style.visibility = 'hidden';
                    } else
                        document.querySelector('.crop').innerHTML = "cancel"
                        // defining the save button visibility
                    let save = document.querySelector('.save');
                    if (save.style.visibility === 'visible')
                        save.style.visibility = 'hidden';
                    else
                        save.style.visibility = 'visible';
                    // defining the grid box visibility
                    let view = document.querySelector('.grid');
                    console.log(view.getBoundingClientRect());
                    if (view.style.visibility === "visible")
                        view.style.visibility = "hidden";
                    else
                        view.style.visibility = "visible";
                    // defining the grid lines visibility
                    let view2 = document.querySelectorAll('.grid>div');
                    view2.forEach(function(a) {
                        if (a.style.visibility === "visible")
                            a.style.visibility = "hidden";
                        else
                            a.style.visibility = "visible";
                    });
                    //   defining the corners visibility
                    let view3 = document.querySelectorAll('.grid>div>div');
                    view3.forEach(function(b) {
                        if (b.style.visibility === "visible")
                            b.style.visibility = "hidden";
                        else
                            b.style.visibility = "visible";
                    });
                }


                // the following function resizes the div based on the mouse click and move events
                function ResizeDiv() {
                    const grid = document.querySelector('.grid');
                    const corners = document.querySelectorAll('.grid>div>div');
                    let initial_width = 0;
                    let initial_height = 0;
                    let initial_x = 0;
                    let initial_y = 0;
                    let initial_mouse_x = 0;
                    let initial_mouse_y = 0;
                    for (let i = 0; i < corners.length; i++) {
                        const corner = corners[i];
                        corner.addEventListener('mousedown', function(e) {
                            e.preventDefault()
                            initial_width = parseFloat(getComputedStyle(grid, null).getPropertyValue('width').replace('px', ''));
                            initial_height = parseFloat(getComputedStyle(grid, null).getPropertyValue('height').replace('px', ''));
                            initial_x = grid.getBoundingClientRect().left;
                            initial_y = grid.getBoundingClientRect().top;
                            grid_x = grid.getBoundingClientRect().left;
                            grid_y = grid.getBoundingClientRect().top;
                            initial_mouse_x = e.pageX;
                            initial_mouse_y = e.pageY;
                            window.addEventListener('mousemove', resize);
                            window.addEventListener('mouseup', stopResize);
                        });


                        function resize(e) {
                            if (corner.classList.contains('bottomrightmark')) {
                                const width = initial_width + (e.pageX - initial_mouse_x);
                                const height = initial_height + (e.pageY - initial_mouse_y)
                                grid.style.width = width + 'px';
                                grid.style.height = height + 'px';
                            } else if (corner.classList.contains('bottomleftmark')) {
                                const height = initial_height + (e.pageY - initial_mouse_y)
                                const width = initial_width - (e.pageX - initial_mouse_x)
                                grid.style.height = height + 'px';
                                grid.style.width = width + 'px';
                                grid.style.left = initial_x + (e.pageX - initial_mouse_x) + 'px'
                            } else if (corner.classList.contains('toprightmark')) {
                                const width = initial_width + (e.pageX - initial_mouse_x)
                                const height = initial_height - (e.pageY - initial_mouse_y)
                                grid.style.width = width + 'px';

                                grid.style.height = height + 'px';
                                grid.style.top = initial_y + (e.pageY - initial_mouse_y) + 'px';
                            } else if (corner.classList.contains('topleftmark')) {
                                const width = initial_width - (e.pageX - initial_mouse_x)
                                const height = initial_height - (e.pageY - initial_mouse_y)
                                grid.style.width = width + 'px'
                                grid.style.left = initial_x + (e.pageX - initial_mouse_x) + 'px'
                                grid.style.height = height + 'px'
                                grid.style.top = initial_y + (e.pageY - initial_mouse_y) + 'px'

                            } else if (corner.classList.contains('leftmark')) {
                                const width = initial_width - (e.pageX - initial_mouse_x)
                                grid.style.width = width + 'px';
                                grid.style.left = initial_x + (e.pageX - initial_mouse_x) + 'px';
                            } else if (corner.classList.contains('rightmark')) {
                                const width = initial_width - (e.pageX - initial_mouse_x)
                                grid.style.width = width + 'px';
                                grid.style.left = initial_x + (e.pageX - initial_mouse_x) + 'px';

                            } else if (corner.classList.contains('topmark')) {
                                const height = initial_height - (e.pageY - initial_mouse_y);

                                grid.style.height = height + 'px';
                                grid.style.top = initial_y + (e.pageY - initial_mouse_y) + 'px';

                            } else if (corner.classList.contains('bottommark')) {
                                const height = initial_height + (e.pageY - initial_mouse_y);
                                grid.style.height = height + 'px';

                            }
                        }

                        function stopResize() {
                            window.removeEventListener('mousemove', resize);
                        }
                    }
                }
                const width = initial_width - (e.pageX - initial_mouse_x)
                grid.style.width = width + 'px';
                grid.style.left = initial_x + (e.pageX - initial_mouse_x) + 'px';
            } else if (corner.classList.contains('rightmark')) {
                const width = initial_width - (e.pageX - initial_mouse_x)
                grid.style.width = width + 'px';
                grid.style.left = initial_x + (e.pageX - initial_mouse_x) + 'px';

            } else if (corner.classList.contains('topmark')) {
                const height = initial_height - (e.pageY - initial_mouse_y);

                grid.style.height = height + 'px';
                grid.style.top = initial_y + (e.pageY - initial_mouse_y) + 'px';

            } else if (corner.classList.contains('bottommark')) {
                const height = initial_height + (e.pageY - initial_mouse_y);
                grid.style.height = height + 'px';

            }
        }

        function stopResize() {
            window.removeEventListener('mousemove', resize);
        }
    }
}