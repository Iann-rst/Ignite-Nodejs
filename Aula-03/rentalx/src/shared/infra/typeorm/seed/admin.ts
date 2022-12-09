import { hash } from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");

  const id = uuidv4();
  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, driver_license, "isAdmin", created_at)
    values('${id}', 'admin', 'admin@admin.com.br', '${password}', 'xxxxxx', true, 'now()')`
  );
  await connection.close();
}

create().then(() => console.log("User created"));
