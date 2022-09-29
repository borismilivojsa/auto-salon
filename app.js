let auto = localStorage.getItem('cars') ? JSON.parse(localStorage.getItem('cars')) : []

appendAuto()

$('#show').click(function() {
    $('#submit-form').toggle()
    $('#show').hide()
})

$('#zatvori').click(function() {
    $('#submit-form').hide()
    $('#show').show()
})

$('#cars').on('click', '.btn-delete-car', function() {
    const id = $(this).closest('.car-card').find('.car-id span').text()

    filterItem(id)

    $(this).closest('.car-card').remove()
})

$('#btn-submit').click(function (event) {
    event.preventDefault()

    let id = Math.floor(Math.random()*1000)
    const marka = $('#marka').val()
    const cijena = $('#cijena').val()
    const motor = $('#motor').val()
    const snaga = $('#snaga').val()
    const brzina = $('#brzina').val()

    auto.push({
        'marka': marka,
        'cijena': cijena,
        'motor': motor,
        'snaga': snaga,
        'brzina': brzina,
        'id': id,
    })

    localStorage.setItem('cars', JSON.stringify(auto))

    const hasErrors = checkValidation(marka, cijena, motor, snaga, brzina)

    if (hasErrors) {
        return
    }

    appendElement(id, marka, cijena, motor, snaga, brzina)

    $('#submit-form')[0].reset()
})

function appendAuto() {
    auto.forEach((car) => {
        appendElement(car.id, car.marka, car.cijena, car.motor, car.snaga, car.brzina)
    });
}

function checkValidation(marka, cijena, motor, snaga, brzina){
    let hasErrors = false

    if (marka.length < 3) {
        $('#marka').addClass('is-invalid').removeClass('is-valid')
        $('#error-marka').text('Marka mora imati minimalno 3 karaktera')
        hasErrors = true
    } else {
        $('#marka').removeClass('is-invalid')

    }

    if (isNaN(parseInt(cijena))) {
        $('#cijena').addClass('is-invalid').removeClass('is-valid')
        $('#error-cijena').text('Cijena mora biti broj')
        hasErrors = true
    } else {
        $('#cijena').removeClass('is-invalid')
    }

    if (isNaN(parseInt(motor))) {
        $('#motor').addClass('is-invalid').removeClass('is-valid')
        $('#error-motor').text('Niste unijeli dobro kubikazu')
        hasErrors = true
    } else {
        $('#motor').removeClass('is-invalid')
    }

    if (isNaN(parseInt(snaga))) {
        $('#snaga').addClass('is-invalid').removeClass('is-valid')
        $('#error-snaga').text('Niste unijeli snagu motora')
        hasErrors = true
    } else {
        $('#snaga').removeClass('is-invalid')
    }

    if (isNaN(parseInt(brzina))) {
        $('#brzina').addClass('is-invalid').removeClass('is-valid')
        $('#error-brzina').text('Niste unijeli maksimalnu brzinu vozlia')
        hasErrors = true
    } else {
        $('#brzina').removeClass('is-invalid')
    }

    return hasErrors
}

function appendElement(id, marka, cijena, motor, snaga, brzina) {
    $('#cars').prepend(
        '<div class="col-12 col-sm-6 col-md-4 col-lg-3 position-relative car-card" data-id='+ id +'>'
        +'<div class="card" style="width: 20rem;">'
        +'<img src="car.jpeg" class="card-img-top image">'
        +'<div class="card-body">'
        +'<h5 class="card-title car-marka">Marka:<span>'+ marka +'</span></h5>'
        +'<p class="card-text car-cijena">Cijena:<span>'+ cijena +'</span></p>'
        +'</div>'
        +'<ul class="list-group list-group-flush">'
        +'<li class="list-group-item car-motor">Motor:<span>'+ motor +'</span></li>'
        +'<li class="list-group-item car-snaga">Snaga:<span>'+ snaga +'</span></li>'
        +'<li class="list-group-item car-brzina">Brzina:<span>'+ brzina +'</span></li>'
        +'<li class="list-group-item car-id">Id objave:<span>'+ id +'</span></li>'

        +'</ul>'
        +'<div class="card-body">'
        +'<a href="auto1.html "  class="card-link">Vise</a>'
        +'<button class="btn btn-dark position-absolute bottom-0 start-50 btn-edit-car">Edit</button>'
        +'<button class="btn btn-dark position-absolute bottom-0 end-0 btn-delete-car">Obrisite</button>'
        +'</div>'
        +'</div>'
        +'</div>'
        )
    }

    $('#cars').on('click', '.btn-edit-car', function() {
        $('#submit-form').show()
        $('#btn-edit').show()
        $('#btn-submit').hide()

        const element = $(this).closest('.car-card')
        const id = element.find('.car-id span').text()

        $('#marka').val(element.find('.car-marka span').text())
        $('#cijena').val(element.find('.car-cijena span').text())
        $('#motor').val(element.find('.car-motor span').text())
        $('#snaga').val(element.find('.car-snaga span').text())
        $('#brzina').val(element.find('.car-brzina span').text())
        $('#submit-form').data('id', id)
    })

    $('#btn-edit').click(function (event) {
        event.preventDefault()
        const id = $('#submit-form').data('id')
        filterItem(id)

        const marka = $('#marka').val()
        const cijena = $('#cijena').val()
        const motor = $('#motor').val()
        const snaga = $('#snaga').val()
        const brzina = $('#brzina').val()

        auto.push({
            'marka': marka,
            'cijena': cijena,
            'motor': motor,
            'snaga': snaga,
            'brzina': brzina,
            'id': id,
        })

        localStorage.setItem('cars', JSON.stringify(auto))

        const hasErrors = checkValidation(marka, cijena, motor, snaga, brzina)

        if (hasErrors) {
            return
        }
        console.log('.car-card[data-id='+ id +']')
        const noviElementi = $('.car-card[data-id='+ id +']')
        noviElementi.find('.car-marka span').text(marka)
        noviElementi.find('.car-cijena span').text(cijena)
        noviElementi.find('.car-motor span').text(motor)
        noviElementi.find('.car-snaga span').text(snaga)
        noviElementi.find('.car-brzina span').text(brzina)

        $('#btn-submit').show()
        $('#btn-edit').hide()
        $('#submit-form').hide()
        $('#submit-form')[0].reset()

    })

    function filterItem(id) {
        auto = auto.filter((car) => {
            return car.id != id
        })

        localStorage.setItem('cars', JSON.stringify(auto))
    }

