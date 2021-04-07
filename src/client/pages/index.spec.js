describe('Home Page', () => {
    test('Home mock', () => {
        jest.mock('./index', () => 'Home');
    });
});