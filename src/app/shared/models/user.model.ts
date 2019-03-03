export class User
{
  constructor(
    public Email: string,
    public FullName: string,
    public Password: string,
    public UserName?: string,
    public Id?: number
  )
  {

  }
}
