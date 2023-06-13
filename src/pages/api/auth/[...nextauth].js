import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth'
import Auth0Provider from 'next-auth/providers/auth0';
import prisma from '../../../../lib/prisma';

export const authOptions = (req, res) => ({
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER_BASE_URL,
      authorization: {
        params: {
          prompt: "login"
        }
      }
    })
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
  callbacks: {
    async signIn({ user }) {
      return true
    },
    async session({ session, user, token }) {
      session.user.id = token.id
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id
      }
      return token
    }
  },
  events: {
    async signIn(user) {
      console.log("Sign in event user: ", user)
    },
    async createUser(user) {
      console.log("User from create user: ", user)
    }
  }
})


export default async function auth(req, res) {
  return await NextAuth(req, res, authOptions(req, res))
}