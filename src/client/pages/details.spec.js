describe('Details Page', () => {
    test('Details mock', () => {
        jest.mock('./details', () => 'Home');
    });
});