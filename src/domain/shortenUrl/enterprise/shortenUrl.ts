import { v4 as uuidv4 } from 'uuid';
export interface ShortenUrlProps {
    originalUrl: string;
    shortId: string;
    createdAt?: Date;
    clicks?: number;
    id?: string;
}

export class ShortenUrl {
    private constructor(
        private readonly originalUrl: string,
        private readonly shortId: string,
        private readonly createdAt: Date,
        private clicks: number,
        private readonly id?: string,
    ) { }

    getOriginalUrl(): string {
        return this.originalUrl;
    }

    getShortId(): string {
        return this.shortId;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getClicks(): number {
        return this.clicks;
    }

    getId(): string | undefined {
        return this.id;
    }

    incrementClicks(): void {
        this.clicks++;
    }

    static create(props: ShortenUrlProps): ShortenUrl {
        return new ShortenUrl(
            props.originalUrl,
            props.shortId,
            props.createdAt ?? new Date(),
            props.clicks ?? 0,
            props.id ?? uuidv4(),
        );
    }
}
