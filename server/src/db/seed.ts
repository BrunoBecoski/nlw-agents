import { reset, seed } from "drizzle-seed";

import { db, sql } from "./connection.ts";
import { schema } from "./schema/index.ts";

await reset(db, schema);

await seed(db, schema).refine((f) => {
	return {
		rooms: {
			count: 5,
			columns: {
				name: f.companyName(),
				description: f.loremIpsum(),
				createdAt: f.date({
					maxDate: new Date(2025, 0, 1),
					minDate: new Date(),
				}),
			},
		},
		questions: {
			count: 20,
			columns: {
				question: f.loremIpsum({ sentencesCount: 1 }),
				answer: f.loremIpsum({ sentencesCount: 3 }),
				createdAt: f.date({
					maxDate: new Date(2025, 0, 1),
					minDate: new Date(),
				}),
			},
		},
	};
});

await sql.end();

console.log("🌱 >>> Database seeded");
