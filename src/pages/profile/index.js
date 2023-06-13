import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import prisma from '../../../lib/prisma'
import { ProfileComponent } from '@/components'

function Profile({ user }) {
  return (
    <div className="mt-5 px-8">
      <ProfileComponent user={user} />
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions(context.req, context.res))

  let user;

  if (session) {
    user = await prisma.user.findUnique({
      where: {
        id: session.user.id
      },
      include: {
        therapies: true
      }
    })
  }

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    }
  }
}

export default Profile