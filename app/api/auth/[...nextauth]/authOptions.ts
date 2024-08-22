import { AuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcryptjs from 'bcryptjs'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import clientPromise from '@/lib/mongoDBClient'
import { logInSchema } from '@/lib/validations'
import { getUserByEmail } from '@/lib/actions/user-actions'


export const authOptions:AuthOptions = {
  adapter: MongoDBAdapter(clientPromise) as any,
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text'},
        password: {label: 'password', type: 'password'}, 
      },
      async authorize(credentials) {
        const { email, password } = logInSchema.parse(credentials);

        if (!email || !password) {
          throw new Error('Invalid Credentials');
        };

        const user = await getUserByEmail(email)

        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid Credentials')
        };

        const passwordMatch = await bcryptjs.compare(password, user.hashedPassword);

        if (!passwordMatch) {
          throw new Error('Wrong Password')
        };

        return user;
      },
    })
  ],
  pages: {signIn: '/'},
  session: {strategy: "jwt"},
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
}