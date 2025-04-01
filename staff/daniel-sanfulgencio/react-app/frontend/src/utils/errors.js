export class FormatError extends Error {
    constructor(message) {
        super(message)
        this.name = 'FormatError'
    }
}

export class AuthEror extends Error {
    constructor(message) {
        super(message)
        this.name = AuthEror
    }
}

export class ExistenceError extends Error {
    constructor(message) {
        super(message)
        this.name = ExistenceError
    }
}

export class ContentError extends Error {
    constructor(message) {
        super(message)
        this.name = ContentError
    }
}