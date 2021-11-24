/* eslint-disable no-undef */
import 'cypress-file-upload';

describe('Path1', () => {

  it('happy path', () => {
    cy.visit('http://localhost:3000');

    // Register proceduces:
    cy.get('button[name="signup"]').click();

    cy.get('#basic_email')
      .focus()
      .type('student@unsw.com')
      .should('have.value', 'student@unsw.com');

    cy.get('#basic_name')
      .focus()
      .type('Hayden')
      .should('have.value', 'Hayden');

    cy.get('#basic_password')
      .focus()
      .type('hayden')

    cy.get('#basic_ConfirmPassword')
      .focus()
      .type('hayden')
      .should('have.value', 'hayden');

    cy.get('button[name="submit"]').click();

    cy.get('button[name="hostedlist"]').click();


    //Create new list successfully:
    cy.get('#createNewList').click();

    cy.get('#register_listingTitle')
      .focus()
      .type('q1')
      .should('have.value', 'q1');

    cy.get('#register_street')
      .focus()
      .type('12')
      .should('have.value', '12');

    cy.get('#register_aptNo')
      .focus()
      .type('12')
      .should('have.value', '12');

    cy.get('#register_city')
      .focus()
      .type('12')
      .should('have.value', '12');

    cy.get('#register_state')
      .focus()
      .type('12')
      .should('have.value', '12');

    cy.get('#register_postcode')
      .focus()
      .type('12')
      .should('have.value', '12');
    
    cy.get('#countrySelect')
      .click()
      .get('#Afghanistan').click()

    cy.get('#propertyType')
      .click()
      .get('#apartment').click()

    cy.get('#register_price')
      .focus()
      .type('12')
      .should('have.value', '$ 12');

    cy.get('#register_numBathroom')
      .focus()
      .type('12')
      .should('have.value', '12');

    cy.get('#register_numBedroom')
      .focus()
      .type('12')
      .should('have.value', '12');

    cy.get('#register_numBeds')
      .focus()
      .type('12')
      .should('have.value', '12');
      
    cy.get('#wifi')
      .check();
      
    cy.get('#kitchen')
      .check();

    cy.get('#tv')
      .check();

    cy.get('#register_profilePhoto')
      .attachFile('image.png')

    cy.get('#register_propertyPhotos')
      .attachFile('image.png')

    cy.get('#create')
      .click()

    // Edit listing proceduces:
    cy.get('#edit')
      .click()
    
    cy.get('#editForm_listingTitle')
      .clear()
      .focus()
      .type('zzzq')
      .should('have.value', 'zzzq');

    cy.get('#editForm_profilePhoto')
      .attachFile('image2.png')
    
    cy.get('#submit')
      .click()

    // Publishing listing proceduces:
    cy.get('#goPublish')
      .click()

    cy.get('div[data-cy="datePicker"]')
      .eq(0)
      .click()
      .type('01/01/2022')
      .type('{enter}')
      .type('01/03/2022')
      .type('{enter}')
    
    cy.get('button[data-cy="online"]')
      .click()
    
    // Unpublishing listing proceduces:
    cy.get('#publish')
      .click()
    
    cy.get('button[data-cy="offline"]')
      .click()
    
    // Logout proceduce:
    cy.get('button[name="logout"]')
      .click();

    cy.get('button[class="ant-btn ant-btn-primary"]')
      .click()
    
    cy.wait(500);

    // Login proceduces:
    cy.get('button[name="login"]')
      .click()
    cy.get('#basic_email')
      .focus()
      .type('student@unsw.com')
      .should('have.value', 'student@unsw.com');

    cy.get('#basic_password')
      .focus()
      .type('hayden')
      .should('have.value', 'hayden');

    cy.get('#submit').click();

    cy.wait(500);

    // Delete listing
    cy.get('button[name="hostedlist"]').click();
    cy.wait(500);
    cy.get('#delete').click();
    cy.get('button[class="ant-btn ant-btn-primary"]')
      .click()
  })
})

describe('path2', () =>{

  it('happy path', () => {
    cy.visit('http://localhost:3000');

    // Login proceduces:
    cy.get('button[name="login"]')
      .click()
    cy.get('#basic_email')
    .focus()
    .type('student@unsw.com')
    .should('have.value', 'student@unsw.com');

    cy.get('#basic_password')
      .focus()
      .type('hayden')
      .should('have.value', 'hayden');

    cy.get('#submit').click();

    cy.wait(500);

    cy.get('button[name="hostedlist"]').click();

    cy.wait(500);


    //  Create new listing:
    cy.get('#createNewList').click();

    cy.get('#register_listingTitle')
      .focus()
      .type('a1a1a1')
      .should('have.value', 'a1a1a1');

    cy.get('#register_street')
      .focus()
      .type('12')
      .should('have.value', '12');

    cy.get('#register_aptNo')
      .focus()
      .type('12')
      .should('have.value', '12');

    cy.get('#register_city')
      .focus()
      .type('12')
      .should('have.value', '12');

    cy.get('#register_state')
      .focus()
      .type('12')
      .should('have.value', '12');

    cy.get('#register_postcode')
      .focus()
      .type('12')
      .should('have.value', '12');
    
    cy.get('#countrySelect')
      .click()
      .get('#Afghanistan').click()

    cy.get('#propertyType')
      .click()
      .get('#apartment').click()

    cy.get('#register_price')
      .focus()
      .type('12')
      .should('have.value', '$ 12');

    cy.get('#register_numBathroom')
      .focus()
      .type('12')
      .should('have.value', '12');

    cy.get('#register_numBedroom')
      .focus()
      .type('12')
      .should('have.value', '12');

    cy.get('#register_numBeds')
      .focus()
      .type('12')
      .should('have.value', '12');
      
    cy.get('#wifi')
      .check();
      
    cy.get('#kitchen')
      .check();

    cy.get('#tv')
      .check();

    cy.get('#register_profilePhoto')
      .attachFile('image.png')

    cy.get('#register_propertyPhotos')
      .attachFile('image.png')

    cy.get('#create')
      .click()

    // Publishing listing proceduces:
    cy.get('#goPublish')
      .click()

    cy.get('div[data-cy="datePicker"]')
      .eq(0)
      .click()
      .type('01/01/2022')
      .type('{enter}')
      .type('01/03/2022')
      .type('{enter}')
    
    cy.get('button[data-cy="online"]')
      .click()

     // Logout proceduce:
    cy.get('button[name="logout"]')
      .click();

    cy.get('button[class="ant-btn ant-btn-primary"]')
      .click()
  })
})

describe('path3', () =>{

  it('happy path', () => {
    cy.visit('http://localhost:3000');
    // Register proceduces:
    cy.get('button[name="signup"]').click();

    cy.get('#basic_email')
      .focus()
      .type('book@unsw.com')
      .should('have.value', 'book@unsw.com');

    cy.get('#basic_name')
      .focus()
      .type('Hayden')
      .should('have.value', 'Hayden');

    cy.get('#basic_password')
      .focus()
      .type('hayden')

    cy.get('#basic_ConfirmPassword')
      .focus()
      .type('hayden')
      .should('have.value', 'hayden');

    cy.get('button[name="submit"]').click();

    // Booking room proceduces:
    cy.get('button[name="housinglist"]').click();

    cy.get('div[data-cy="a1a1a1"]')
      .click()
    
    cy.get('#reserve')
      .click()
    
    cy.get('div[data-cy="datePicker"]')
      .eq(0)
      .click()
      .type('2022-01-01')
      .type('{enter}')
      .type('2022-02-02')
      .type('{enter}')

    cy.get('#confirmBooking')
      .click()
  })
})