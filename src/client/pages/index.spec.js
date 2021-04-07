describe('Home Page', () => {
    test('Home mock', () => {
        jest.mock('./index', () => 'Home');
    });
});

describe('Details Page', () => {
    test('Details mock', () => {
        jest.mock('./details', () => 'Home');
    });
});