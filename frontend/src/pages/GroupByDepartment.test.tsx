import { render, screen, waitFor } from '@testing-library/react';
import GroupByDepartment from './GroupByDepartment';

// Mocking the fetch request
global.fetch = jest.fn(() =>
  Promise.resolve(
    new Response(
      JSON.stringify({
        users: [
          {
            "id": 1,
            "firstName": "Emily",
            "lastName": "Johnson",
            "maidenName": "Smith",
            "age": 28,
            "gender": "female",
            "email": "emily.johnson@x.dummyjson.com",
            "phone": "+81 965-431-3024",
            "username": "emilys",
            "password": "emilyspass",
            "birthDate": "1996-5-30",
            "image": "https://dummyjson.com/icon/emilys/128",
            "bloodGroup": "O-",
            "height": 193.24,
            "weight": 63.16,
            "eyeColor": "Green",
            "hair": {
              "color": "Brown",
              "type": "Curly"
            },
            "ip": "42.48.100.32",
            "address": {
              "address": "626 Main Street",
              "city": "Phoenix",
              "state": "Mississippi",
              "stateCode": "MS",
              "postalCode": "29112",
              "coordinates": {
                "lat": -77.16213,
                "lng": -92.084824
              },
              "country": "United States"
            },
            "macAddress": "47:fa:41:18:ec:eb",
            "university": "University of Wisconsin--Madison",
            "bank": {
              "cardExpire": "03/26",
              "cardNumber": "9289760655481815",
              "cardType": "Elo",
              "currency": "CNY",
              "iban": "YPUXISOBI7TTHPK2BR3HAIXL"
            },
            "company": {
              "department": "Engineering",
              "name": "Dooley, Kozey and Cronin",
              "title": "Sales Manager",
              "address": {
                "address": "263 Tenth Street",
                "city": "San Francisco",
                "state": "Wisconsin",
                "stateCode": "WI",
                "postalCode": "37657",
                "coordinates": {
                  "lat": 71.814525,
                  "lng": -161.150263
                },
                "country": "United States"
              }
            },
            "ein": "977-175",
            "ssn": "900-590-289",
            "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36",
            "crypto": {
              "coin": "Bitcoin",
              "wallet": "0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a",
              "network": "Ethereum (ERC20)"
            },
            "role": "admin"
          },
          {
            "id": 7,
            "firstName": "Alexander",
            "lastName": "Jones",
            "maidenName": "",
            "age": 38,
            "gender": "male",
            "email": "alexander.jones@x.dummyjson.com",
            "phone": "+61 260-824-4986",
            "username": "alexanderj",
            "password": "alexanderjpass",
            "birthDate": "1986-10-20",
            "image": "https://dummyjson.com/icon/alexanderj/128",
            "bloodGroup": "AB-",
            "height": 153.89,
            "weight": 77.42,
            "eyeColor": "Blue",
            "hair": {
              "color": "White",
              "type": "Straight"
            },
            "ip": "166.204.84.32",
            "address": {
              "address": "664 Maple Street",
              "city": "Indianapolis",
              "state": "Delaware",
              "stateCode": "DE",
              "postalCode": "86684",
              "coordinates": {
                "lat": 35.289664,
                "lng": 7.063255
              },
              "country": "United States"
            },
            "macAddress": "d2:64:58:2d:1c:46",
            "university": "University of Illinois--Urbana-Champaign",
            "bank": {
              "cardExpire": "05/25",
              "cardNumber": "7344951706130140",
              "cardType": "JCB",
              "currency": "EUR",
              "iban": "49V4GVDVMP0MHIDD4VXMQ3A2"
            },
            "company": {
              "department": "Engineering",
              "name": "Dickens - Beahan",
              "title": "Web Developer",
              "address": {
                "address": "996 Eighth Street",
                "city": "Washington",
                "state": "Kansas",
                "stateCode": "KS",
                "postalCode": "27858",
                "coordinates": {
                  "lat": -75.462366,
                  "lng": -128.025697
                },
                "country": "United States"
              }
            },
            "ein": "638-127",
            "ssn": "722-993-925",
            "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
            "crypto": {
              "coin": "Bitcoin",
              "wallet": "0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a",
              "network": "Ethereum (ERC20)"
            },
            "role": "moderator"
          },
          {
            "id": 8,
            "firstName": "Ava",
            "lastName": "Taylor",
            "maidenName": "",
            "age": 27,
            "gender": "female",
            "email": "ava.taylor@x.dummyjson.com",
            "phone": "+1 458-853-7877",
            "username": "avat",
            "password": "avatpass",
            "birthDate": "1997-8-25",
            "image": "https://dummyjson.com/icon/avat/128",
            "bloodGroup": "AB-",
            "height": 168.47,
            "weight": 57.08,
            "eyeColor": "Hazel",
            "hair": {
              "color": "Red",
              "type": "Kinky"
            },
            "ip": "150.73.197.233",
            "address": {
              "address": "1197 First Street",
              "city": "Fort Worth",
              "state": "Rhode Island",
              "stateCode": "RI",
              "postalCode": "24771",
              "coordinates": {
                "lat": -81.194833,
                "lng": -87.948158
              },
              "country": "United States"
            },
            "macAddress": "8d:2e:c2:d6:e7:a8",
            "university": "University of Wisconsin--Madison",
            "bank": {
              "cardExpire": "01/29",
              "cardNumber": "6412128967460199",
              "cardType": "Maestro",
              "currency": "CNY",
              "iban": "TS66YQ8R16OX7IJKLUONDQHP"
            },
            "company": {
              "department": "Marketing",
              "name": "Nikolaus Inc",
              "title": "Chief Executive Officer",
              "address": {
                "address": "930 Lincoln Street",
                "city": "Austin",
                "state": "Colorado",
                "stateCode": "CO",
                "postalCode": "47592",
                "coordinates": {
                  "lat": 87.970083,
                  "lng": -42.769351
                },
                "country": "United States"
              }
            },
            "ein": "297-762",
            "ssn": "257-419-109",
            "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
            "crypto": {
              "coin": "Bitcoin",
              "wallet": "0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a",
              "network": "Ethereum (ERC20)"
            },
            "role": "moderator"
          },
        ],
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    )
  )
);

test('test convert data', async () => {
  render(<GroupByDepartment />);

  const engineeringDepartment = await screen.findByText(/Engineering/);
  expect(engineeringDepartment).toBeInTheDocument();

  expect(screen.getByText(/"male": 1/)).toBeInTheDocument();
  const engineeringFemaleElements = await screen.findAllByText(/"female": 1/);
  expect(engineeringFemaleElements.length).toBeGreaterThan(0);
  expect(screen.getByText(/"ageRange": 28-38/)).toBeInTheDocument();
  expect(screen.getByText(/"Brown": 1/)).toBeInTheDocument();
  expect(screen.getByText(/"White": 1/)).toBeInTheDocument();
  expect(screen.getByText(/"EmilyJohnson": "29112"/)).toBeInTheDocument();
  expect(screen.getByText(/"AlexanderJones": "86684"/)).toBeInTheDocument();

  const marketingDepartment = await screen.findByText(/Marketing/);
  expect(marketingDepartment).toBeInTheDocument();
  expect(screen.getByText(/"male": 0/)).toBeInTheDocument();
  expect(screen.getByText(/"ageRange": 27/)).toBeInTheDocument();
  expect(screen.getByText(/"Red": 1/)).toBeInTheDocument();
  expect(screen.getByText(/"AvaTaylor": "24771"/)).toBeInTheDocument();
});

