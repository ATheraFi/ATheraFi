
const Avatar = ({ user }) => {
  const userFirstInitial = user.name.charAt(0)

  return (
    <div className="avatar placeholder">
      <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
        { user.image ? (
          <img src={user.image} />
        ) : (
          <span className="text-3xl">{ userFirstInitial }</span>
        )}
      </div>
    </div> 
  )
}

export default Avatar