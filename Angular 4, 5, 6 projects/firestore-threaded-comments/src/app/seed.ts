import * as faker from 'faker';

export class Seed {

    static user() {
        return {
            uid: faker.random.alphaNumeric(12),
            name: faker.name.firstName(),
            email: faker.internet.email()
        }
    }


    static comment(parent: string | null) {

        return {
            id: faker.random.alphaNumeric(12),
            user: faker.name.firstName(),
            createdAt: new Date().getTime(),
            text: faker.lorem.paragraph(),
            parent
        }
    }

}
