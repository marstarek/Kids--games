'use strict'
var itemActive = $('.item.active')
$('#next_screen').on('click', function () {
    checkBtnStatusChecker($('.item.active').next())
})
$('#prev_screen').on('click', function () {
    checkBtnStatusChecker($('.item.active').prev())
})
$('.footer_btn').on('click', function () {
    $('.check_btn').parent().addClass('prevent_click')
    setTimeout(() => {
        checkBtnStatusChecker($('.item.active'))
    }, 650)
})

const point = `<div class="point"></div>`
$('.click_img').on('click', function (e) {
    const wrapper = $(this).parent()
    const parentOffset = wrapper.offset()
    const point_Center_width = 7
    const point_Center_height = 7
    let XCoordinate =
        ((e.pageX -
            parentOffset.left -
            point_Center_width -
            $(document).scrollLeft()) /
            $(wrapper).width()) *
        100
    let YCoordinate =
        ((e.pageY -
            parentOffset.top -
            point_Center_height -
            $(document).scrollTop()) /
            $(wrapper).height()) *
        100
    console.log($(this).parent().addClass('checked'))
    $(this)
        .parent()
        .append(
            $(point)
                .css({ top: YCoordinate + '%', left: XCoordinate + '%' })
                .on('click', function (e) {
                    $(this).remove()
                }),
        )
    Points_Existence_checker()
})
//...getCoordinates...
function getCoordinates(elem) {
    let elemLeft = elem.getBoundingClientRect().left
    let elemRight = elem.getBoundingClientRect().right
    let elemTop = elem.getBoundingClientRect().top
    let elemBottom = elem.getBoundingClientRect().bottom
    return { elemLeft, elemRight, elemTop, elemBottom }
}
//...check_If_Point_In...

function check_If_Point_In() {
    let answers = document.querySelectorAll('div.active .answer')
    let point_width = $('div.active .point').width()
    var points = document.querySelectorAll('div.active .point')
    for (var i = 0; i < answers.length; i++) {
        var {
            elemLeft: ansLeft,
            elemRight: ansRight,
            elemTop: ansTop,
            elemBottom: ansBottom,
        } = getCoordinates(answers[i])
        for (var j = 0; j < points.length; j++) {
            var point_y = points[j].getBoundingClientRect().top + point_width
            var point_x = points[j].getBoundingClientRect().left + point_width
            console.table({
                elemLeft: ansLeft,
                elemRight: ansRight,
                elemTop: ansTop,
                elemBottom: ansBottom,
                point_x: point_x,
                point_y: point_y,
            })
            console.log('point', points[j])

            if (
                point_x >= ansLeft &&
                point_x <= ansRight + point_width &&
                point_y >= ansTop &&
                point_y <= ansBottom + point_width
            ) {
                points[j].classList.add('true')
            }
        }
    }
}
//...check_btn_checker...

function checkBtnStatusChecker(itemActive) {
    let done = $(itemActive).hasClass('done')
    let checked = $(itemActive).hasClass('check_btn_checked')
    if (done && !checked) {
        $('.check_btn').parent().removeClass('prevent_click')
    } else if (done && checked) {
        $('.check_btn').parent().addClass('prevent_click')
    } else {
        $('.check_btn').parent().addClass('prevent_click')
    }
}
//...Points_Existence_checker...

function Points_Existence_checker() {
    if ($('div.active .question').length == $('div.active .checked').length) {
        $('div.active').addClass('done')
        $('.check_btn').parent().removeClass('prevent_click')
    }
}

//...Points_Remover...

function Points_Remover() {
    $('.point').each(function () {
        $(this).remove()
    })
}

//...reloadScreen...

function reloadScreen() {
    Points_Remover()
    $('.check_btn').parent().addClass('prevent_click')
    $('.item').removeClass('done check_btn_checked')
    $('.click_img').removeClass('prevent_click')
    $('.question').removeClass('checked')
}
//...checkAns...

function checkAns() {
    check_If_Point_In()
    $('div.active').removeClass('done ')
    $('div.active').addClass('check_btn_checked')
    $('.check_btn').parent().addClass('prevent_click')
    $('div.active .click_img').addClass('prevent_click')
    $('div.active .point').addClass('no_click')
    $('div.active .point').each(function (index, element) {
        var pointElment = $(element).hasClass('true')

        pointElment ? null : $(element).addClass('false')
    })
}
