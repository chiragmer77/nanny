import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aupair-country',
  templateUrl: './aupair-country.component.html',
  styleUrls: ['./aupair-country.component.scss'],
  animations: [
    trigger('fadeInAnimation', [
      // The '* => *' will trigger the animation to change between any two states
      transition('* => *', [
        // The CSS styles at the start of the animation
        style({ opacity: 0 }),
        // The animation and styles at the end
        animate('1s', style({ opacity: 1 }))
      ]),
    ]),
 

  trigger('bounce', [
    transition(':enter', [
      animate('1s ease-in-out', keyframes([
        style({ transform: 'scale(0.5)', opacity: 0, offset: 0 }),
        style({ transform: 'scale(1.2)', opacity: 0.5, offset: 0.3 }),
        style({ transform: 'scale(1)', opacity: 1, offset: 1 })
      ]))
    ])
  ]),
  
  trigger('fadeIn', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('0.5s ease-out', style({ opacity: 1 })),
    ]),
  ]),
  
  
],
})
export class AupairCountryComponent implements OnInit {

  countries = [
    {
      name: 'Austria',
      subtitle: '',
      age: '18-28 (17-30 EU) years',
      hours:  '20 hrs/week',
      pocketmoney: '500 € / month',
      holidays: '4 weeks vacation', 
      size: 'Size 1',
      description: [
        'German language level A1 needed for Non EU',
        'Family should have at least one child under the age of 18',
        'For Non-EU, the host family need to apply at Arbeitsmarktservice - AMS. After getting confirmation from AMS, Au pair can apply for visa at Austrian embassy in home country.'
      ],
   
      links: [
        { name: 'Visa Info website', url: 'https://www.ams.at/unternehmen/service-zur-personalsuche/beschaeftigung-auslaendischer-arbeitskraefte/volontariat--ferial--oder-berufspraktikum-und-au-pair#wergiltalsaupair' }
  
      ]
    },
    {
      name: 'Belgium',
      subtitle: 'Recommended for Non EU',
      age: '18-28 (18-30 EU)',
      hours:'20 hrs/week',
      pocketmoney: '450 € / month',
      holidays: 'No vacation rules', 
      size: 'Size 2',
      image:'assets/images/country/belgium.png',
      description: [
        'Au pair should have a good conduct certificate and a medical certificate from doctor approved by embassy',
        'The host family must apply for an employment authorization and a B work permit from the Immigration Service',
        'Only 1 rematch possible. Second family has to apply for permit and need to wait for Authorisation',
      ],
      links: [

        { name: 'Visa Info website', url: 'https://employment.belgium.be/en/themes/international/foreign-workers/au-pair-work-belgium' }

      ],
      agencies:[
        {name:'Au pair-Office', websitename:'Website', url:'https://aupairoffice.com/form-for-au-pairs/', details: 'Its one of the biggest Au pair agency in Belgium'},
        {name:'Au pair-Belgium', websitename:'Website', url:'https://www.aupairbelgium.be/en/au-pair-registration/', details: 'Agency based in Brussels'},
      ]

    },
    {
      name: 'Canada',
      subtitle: '',
      age: '18-35',
      hours:'No rule',
      pocketmoney: '913 € / month',
      holidays: 'No vacation rules', 
      description: [
        'No Au pair visa. Working Holiday visa only',
        'Mostly to European countries Plus Chile Japan, South Korea , Taiwan'
      ],
      links: []
    },
    {
      name: 'China',
      subtitle: '',
      age: '18-29',
      hours:'30 hrs/week',
      pocketmoney: '300 € / month',
      holidays: '12 days', 
      description: [
        'Need to learn Chinese language',
        'Mostly prefer European Au pairs only',
        'F Visa(visit) for 6  month & X-Visa(Student) for  longer stay and  need  to  be  enrolled  for studiesHost family can apply work permit B for Au pair',
        'Invitation letter to apply for visa can be provided by agency or host family'
      ],
      links: [],
      agencies:[
        {name:'Beijing Zhong Hui', websitename:'Website', url:'http://www.aupaircn.com/a/program/china/AU_PAIR_IN_CHINA/', details: 'They have an inboud Au pair program which helps other Nationals to Au pair or to be a tutor in China. They also help Chinese Nationals to be Au pair in US and Europe '}]
    }, 
    {
      name: 'Denmark',
      subtitle: 'Recommended for Non EU. 2 Year visa',
      age: '18-29',
      hours:'30 hrs/week',
      pocketmoney: '610 € or 4550 DKK',
      holidays: '3 Weeks', 
      image:'assets/images/country/denmark.png',
      description: [
        '24 Months visa',
        'Host family must pay for flight ticket of Non-EU  Au pairs',
        'At least one of the host parent should be Danish citizen',
        'Visa application can be done online or by form. In Online, host family start the process by login using NemId. Both host parents should sign using NemId. Family gets a reference number', 
        'With this reference number Au pair can fill in rest of the application and attach documents. Then Au pair should provide biometrics at the nearest embassy within 14 days'
      ],
      links: [  { name: 'Visa Apply website', url: 'https://nyidanmark.dk/en-GB/Applying/Au%20pair?anchor=canyouapply' },
    ],
    agencies:[
      {name:'Au pair Agent.dk', websitename:'Website', url:'https://aupairagent.eu/', details: 'They are specialised in scadinavian countries and mostly in Denmark. They have a application fee of around 270 Euros from Au pair and around 800 euros from host family'}]
    }, 
     
    {
      name: 'Finland',
      subtitle: '',
      age: '18-30',
      hours:'25 hrs/week',
      pocketmoney: '280 € ',
      holidays: '4 weeks', 
      description: [ 		
          'Au pair applicant should have never been an Au pair in the past',
          'All Au pairs should do a Finnish/Swedish course',
          'Au pair can submit application at embassy in home country. Processing time is 2-4 months  and Application fee is 380 euros'
      ],
      links:[{name: 'Visa Apply website', url:'https://migri.fi/en/au-pair/en'} ]
    }, 
    {
      name: 'France',
      subtitle: '',
      age: '17-30',
      hours:'30 hrs/week',
      pocketmoney: '320 € / month',
      holidays: 'No  rules', 
      description: [		       	
            'Au pairs should know some basic French',
            'Au pair has to pay for visa and travel',
            'France has 2 kind of Au pair programs of which “Stagiaire aide familial étranger” is recommended',
            'Under the above scheme host family need to pay tax to hire an Au pair'
        
      ],
      links: [{name: 'Visa Info website', url:'https://france-visas.gouv.fr/en/web/france-visas/trainee-caregiver'} ,
      {name: 'Urasaf', url:'https://www.urssaf.fr/portail/home/services-a-la-personne/autres-activites/stagiaire-aide-familial-etranger.html'} 
      ],
      agencies:[
        {name:'AFJ Au pair', websitename:'Website', url:'https://www.afj-aupair.org/en/become-an-au-pair-in-france/', details: 'They place Au pairs with host families mostly in the South of France'}]
    }, 
    {
      name: 'Germany',
      subtitle: 'Recommended for Non EU',
      age: '18-26 years',
      hours:'30 hrs/week',
      pocketmoney: '280 € / month',
      holidays: '4 weeks', 
      image:'assets/images/country/germany.png',
      description: [
            'German A1 certificate needed for  Non-EU citizens',
            'Au pair from EU country can work without any permit',
            'Au pair may be married',
            'Atleast one host parent should be a EU citizen. Au pair cannot be from native country of host parent',
            'Family should be German speaking at home. Families must pay 70 eur per month for language course',  
            'Two thirds of the costs of Au pair is Tax deductible, but a maximum of 4,000 euros per year per child',         
            'Au pair agencies exists in Germany but not mandatory to have agency. Agency may not collect more than 150 euros from Au pair',
            'The host family send the signed Au pair contract and invitation letter by post. With this Au pair applies at Germany embassy in her country',
            'Visa processing time is 4-8 weeks',
            'After being Au pair it is possible to stay some more time through a free social year (Freies Soziales Jahr) '
        
      ],
      links: [{name: 'Visa Info website', url:'https://www.arbeitsagentur.de/datei/au-pair-in-germany-en_ba030535.pdf'}],
      agencies:[
        {name:'ZUBKE', websitename:'Website', url:'https://www.aupair-zubke.de', details: 'They hire Au pairs from abroad to come to Germany'},
        {name:'Multikultur', websitename:'Website', url:'https://www.multikultur.info/au-pair-vermittlung-fuer-gastfamilien.html', details: 'Its a popular agency based in Cologne. The placement fee for host family is 840 euros'},
        {name:'Latin Au pair', websitename:'Website', url:'https://www.latinaupair.de', details: 'They are specialsied in placing Spanish speaking Au pairs from South America and Spain. Their placement fee for host family is around 1200 and then around 180 euros per month after 6 months'}]

    }, 
    {
      name: 'Iceland',
      subtitle: '',
      age: '18-25 years',
      hours:'30 hrs/week',
      pocketmoney: '400 € or 60.000 ISK',
      holidays: '2 weeks', 
      description: [ 	
       'Atleast 1 host family  member should have Icelandic citizenship or a permanent residence permit',	       	
       'Host family should pay atleast half of the travel expence. They can also pay it fully',
       'Host family can apply  for residence permit with a  mail to the Directorate of Immigration in Kópavogur',
       'If the application is approved  Au pair can collect the D Visa at embassy in home country'
      ],
      links: [{name: 'Visa Apply website', url:'https://island.is/en/au-pair-placement-residence-permit'},
      {name: 'Aupair-Contract', url:'https://utl.eydublod.is/Forms/Form/S-801'}]
    }, 
    {
      name: 'Ireland',
      subtitle: '',
      age: '18-27 (18-28 EU)',
      hours:'48 hrs/week',
      pocketmoney: '12.7 eur/hour',
      holidays: '', 
      description: [  	
        'Au pairs are viewed as workers and host families as employers',
        'Au pair get minimum wage. Will be 12.70 euro if you are above 20 years. Under 18 Au pairs get 8,8 Eur per  hour',
        'Host family can get permission from Labour court to pay lower  wage',
        'Argentina, Australia, Canada, Monaco, New Zealand, South Korea, Taiwan and Japan can apply using Youth mobility scheme',
        'Student visa is possible. Need to be enrolled for a course. US citizens can  get  work visa to be Au pair.'
       
        
      ],
      links: [{name: 'Visa Info website', url:'https://www.citizensinformation.ie/en/employment/employment-rights-and-conditions/pay-and-employment/minimum-wage/'} ]
    }, 
    {
      name: 'Italy',
      subtitle: '',
      age: '18-30 years',
      hours:'30 hrs/week',
      pocketmoney: '260-300 € / month',
      holidays: '12 ', 
      description: [
            'There is No Aupair program or Au pair visa in Italy',
            'For Non-EU Student visa is possible. Need to enroll for  20 hours Italian  language course and it is mandatory',
            'Host should submit a declaration to local police station within 48 hours of the arrival  of Au pair',
      ],
      links: [],
    agencies:[
      {name:'International Au pair Italy', websitename:'Website', url:'https://www.internationalaupairitaly.com/wp/en/', details: 'They also have a Demi Au pair program which is a mix of Student exchange and Au pair program'},
      {name:'Roma Au pair In & Out', websitename:'Website', url:'https://www.romaaupair-in-out.com/index.php/en/', details: 'They are specialised in selecting and placing young tutors and Au pairs in Italy and abroad, with a network of corresponding agencies located in the most important EU countries'}]		

    }, 
    {
      name: 'Luxembourg',
      subtitle: '',
      age: '18-30',
      hours:'25 hrs/week',
      pocketmoney: '500 € / month',
      holidays: '12 days', 
      description: [
            'Host family should have 1 child under 13 years of age',
            'Host family need to prove that child is registered in child care center',
            'Host must send the completed application  by post to the National Youth Service (Service national de la jeunesse - SNJ)',
            'SNJ is responsible of  monitoring  and  approving  application  for Au pairs',
            'Since Luxembourg is small  country they cannot  provide visa for large number of applicants',
            'In  general we noticed more Brazilian Au pairs in Luxembourg'
      ],
      links: [{name: 'Visa Info website', url:'https://www.au-pair.lu/'} , 
      {name: 'Public.lu', url:'https://guichet.public.lu/en/citoyens/famille/parents/garde-enfants/accueil-au-pair.html'}]		,

      agencies:[
                {name:'Alpha Omega', websitename:'Website', url:'https://www.ao-aupair.lu/au-pair-agency-luxembourg.html', details: ''},
                  ]
    }, 
    {
      name: 'Netherlands',
      subtitle: 'Recommended for Non EU',
      age: '18-25 years',
      hours:'30 hrs/week',
      pocketmoney: '340 € / month',
      holidays: '2 weeks', 
      image:'assets/images/country/netherland.png',
      description: [
        '1600 Non EU Au pairs come every year to Netherlands',	
        'Has 30% Filipino Au pair, 25% South African Au pairs',
        'Agency is mandatory and only agency can apply for Au pair visa.',
        'IND is the government agency that process the visa',
        'Visa processing time is 2 weeks',
        
      ],
      links: [{name: 'Visa Info website', url:'https://ind.nl/en'},
              {name: 'How-to-Apply', url:'https://www.aupairinfo.nl/how-to-apply'},
              {name: 'Info-Website', url:'https://www.aupairinfo.nl'} ],

      agencies:[
                {name:'Sunshine Au pair', websitename:'Sunshine website', url:'https://sunshine-aupair.com/', details: 'Most of the Au pairs of the agency come from Asian countries, though they have Au pairs from all around the world. They also have few recruitment specialists based in Philippines. Its possible to apply on their website.'},
                {name:'Nina Care', websitename:'Nina care website', url:'https://www.nina.care/', details: 'Nina Care is an agency that provide Au pairs and babysitters. They recruit from all around the world. They also recruit from African countries. It is possible to register as an Au pair through their mobile App. '},
                {name:'Complete Au pair', websitename:'Website', url:'https://www.completeaupair.nl/', details: 'They recruit only from Philippines. '},
                {name:'Au pair International', websitename:'Website', url:'https://aupairinternational.nl/', details: 'Its one of the biggest agencies in Netherlands and has Au pairs from around the world. '},
                {name:'Other Agencies', websitename:'IND Agency list', url:'https://ind.nl/en/public-register-recognised-sponsors/public-register-au-pair-and-exchange', details: 'Their are 22 IND recognised agencies in Netherlands. Only some are very active. The full list can be found in IND website'},
                {name:'Yellow Au pairs', websitename:'Website', url:'https://www.yellowaupairs.nl', details: 'They help Dutch citizens to find host families in US, Canada, Australlia and other EU countries'},
                {name:'Travel Active', websitename:'Website', url:'https://www.travelactive.nl/', details: 'They help Dutch citizens to find host families abroad and also other Au pairs to find host families in Netherlands'}

              ]
    }, 
    {
      name: 'New Zealand',
      subtitle: '',
      age: '18-30 years',
      hours:'35 hrs/week',
      pocketmoney: '560 € / month',
      holidays: 'No rules', 
      description: [		 	         	
        'No Au pair visa. Working Holiday visa is possible, for Asians, Europeans and  South Americans',
        'For some countries there is quota on number of visas issued per year. China(1000), Philippines(100),Thailand(100), Turkey(100), Argentina(1000), Brazil(300), USA(unlimited), Spain(200), Italy(unlimited) . Check the immigration website for full list',

        
      ],
      links: [{name: 'Visa Apply website', url:'https://www.immigration.govt.nz/new-zealand-visas'}]
    }, 
    {
      name: 'Norway',
      subtitle: 'Recommended for Non EU. 2 Year visa',
      age: '18-30 years',
      hours:'30 hrs/week',
      pocketmoney: '500 € / month',
      holidays: '12 days', 
      image:'assets/images/country/norway.png',
      description: [
        'Government want to end  Au   pair program in Norway as many Au pairs were abused. But final  decision is  not  yet taken',
        'There are around 1100 Non EU Au pairs in Norway and most Au pairs are from Philipines',
        'Au pair should pay for flight to travel to host family. Family should pay for return flight',
        'Family need to pay income tax on behalf of Au pair',
        'Family should pay minimum 8850 NOK for Norwegian course',
  
        'First Au pair contract need too be signed by both parties. Au  pair   can  apply for visa at embassy in home country. 8-10 week visa process time'
      ],	        

      links: [{name: 'Visa Info website', url:'https://www.udi.no/en/want-to-apply/au-pair/au-pair-permit/?c=phl'}]
    }, 
    {
      name: 'Spain',
      subtitle: '',
      age: '18-30 years',
      hours:'No rules',
      pocketmoney: '250 € / month',
      holidays: '2 weeks', 
      description: [ 				
        'Spain do not have Au pair Program',
        'Non EU can apply for Student visa and need to attend 20 hours Spanish lesson every week. So there is not much applicants for this ',
        'Au pair visa may not be given to countries that have Spanish as main language',
        'Argentinian and Japanese can apply for Working Holiday visa',
        'Visa processing can take 2-3  months'
      ],
      links: []
    }, 
    {
      name: 'Sweden',
      subtitle: 'Recommended for Non EU',
      age: '18-30',
      hours:'25 hrs/week',
      pocketmoney: '450 € / month',
      holidays: '4 weeks', 
      image:'assets/images/country/sweden.png',
      description: [		    	
        'If  the applicant was an Au  pair before the visa  may be rejected',
        'Au pair need to pay income tax',
        'To change family Au pair need to apply again for work permit',
        'Citizens from Argentina, Australia, Canada, Chile, Hong Kong, New Zealand, South Korea and Uruguay can apply for a Working Holiday visa.'
        
      ],
      links: [{name: 'Visa Apply website', url:'https://www.migrationsverket.se/English/Private-individuals/Working-in-Sweden/Employed/Special-rules-for-certain-occupations-and-citizens-of-certain-countries/Au-pair.html'}],
      agencies:[
        {name:'SAPC', websitename:'Website', url:'https://aupair.se/', details: 'They are specialised in scadinavian countries. Most host families are from Sweden. Most of the Au pairs come from Philipinnes and few from Africa and Europe'}
      ]
    }, 
    {
      name: 'Switzerland',
      subtitle: '2 years for EU',
      age: '18-25 (17-30 EU)',
      hours:'30 hrs/week',
      pocketmoney: '520 -830 € / month',
      holidays: '4 weeks', 
      description: [
        'Different rules for EU and Non EU. Chances of Non EU are limited', 	
        'EU Au pairs do not need an agency,  but need to get a residence permit before staying with host family',
        'Non EU Au pairs can come only through an agency approved by SECO',
        'EU Au pairs can stay for 2 years while its only 1 year for Non EU Au pair',
        'Certain cantons or  provinces like Zurich, Geneva does not accept  Non EU Au pairs. Cantons like  Aargau, St. Gallen, Bern, Basel-Stadt, Basel-Land, Luzern, Graubünden, Lucerne and Zug accept Non EU Aupairs',
        'Au pair rules and Salary also depends on Cantons. Au pairs also need to pay income tax',
        'Visa processing time 6 weeks'
        
      ],
      links: [{name: 'Swiss Nanny', url:'https://www.swissnanny.org/au-pairs'}]
    }, 
    {
      name: 'Turkey',
      subtitle: '',
      age: '18-30+',
      hours:'30-40 hrs/week',
      pocketmoney: '300 € / month',
      holidays: '12 days', 
      description: [ 		 
        'No Official Au pair program',
        'Many Asians  work in child care',
        'For many nationalities visa is not needed to travel to Turkey. Sometimes Au pair comes as tourist and then apply for Visa',
        'Since there is no official rules the salary also depends on what is negotiated  with host family. Also Au pair can be  above 30 years'   
      ],
      links: [{name: 'Visa Info website', url:'https://www.mfa.gov.tr/visa-information-for-foreigners.en.mfa'}]
    }, 
    {
      name: 'UK',
      subtitle: '',
      age: '18-30 years',
      hours:'30 hrs/week',
      pocketmoney: '415 € / month',
      holidays: '4 weeks', 
      description: [      	
        'Most Non EU Countries citizens cannot be an Au pair in UK',
        'Due to Brexit EU citizens also cannot be an Au pair in UK. Those who lived in UK before Brexit could stay. Irish citizens can be Au pair in UK',
        'With Youth mobility scheme Au pairs from Australlia, Canada, Iceland, Hong Kong, Japan South Korea and Taiwan can stay here' ,
        'For Youth mobility scheme you must have minimum £2,530 in bank account'
      ],
      links: [{name: 'Visa Info website', url:'https://www.gov.uk/au-pairs-employment-law/au-pairs'},
      {name: 'Youth-Mobility-Scheme', url:'https://www.gov.uk/youth-mobility/eligibility'}],
      agencies:[
        {name:'Smart Aupairs', websitename:'Website', url:'https://www.smartaupairs.com', details: 'They  places many au pairs from Australia, New Zealand, Canada, South Africa (with Ancestry Visa) & EU (with pre-settled status) & Ukraine (with UK working rights) with host families in UK'}
      ]
    },
     
    {
      name: 'USA',
      subtitle: '',
      age: '18-26 years',
      hours:'45 hrs/week',
      pocketmoney: '730 € / 800 $',
      holidays: '2 weeks', 
      image:'assets/images/country/usa.png',
      description: [      	
        '1 year visa which could be extended for 1 more year',
        'Only Government approved agency can apply for J1 cultural exchange visa',
        'Some of the agencies are  Aupair care, Cultural care, Go Aupair, Aupair in America etc. Links below',
        'Au pair have to pay agency fees between 1000 - 2000 $ depending on agency',
        'Most USA Au pairs are from Latin American countries',
        'Host family should pay 500 dollar for educational course'
      ],
      links: [{name: 'J1 Visa Info website', url:'https://j1visa.state.gov/programs/au-pair'},
      {name: 'Aupair-Care', url:'https://www.aupaircare.com/au-pairs/program-qualifications'},
      {name: 'CulturalCare', url:'https://www.culturalcare.com/'},
      {name: 'Go Aupair', url:'https://www.goaupair.com'},
      {name: 'Aupair in America', url:'https://www.aupairinamerica.com/'}]
    }

   

  ];
  //constructor() { }
  constructor(
    public router: Router
  ){}
  
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

}
