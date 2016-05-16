describe AdminController, :type => :controller do

  context "community user" do
    comm_user = User.create(confirmed_at: Time.now, :email => "pooping@email.com", :password => "poopypants")

    describe 'index' do
      before :each do
        sign_in comm_user
        allow(subject).to receive(:current_user).and_return(comm_user)
      end

      it 'should redirect' do
        get :index
        expect(response).to redirect_to root_path
      end
    end
  end

  context "admin user" do
    admin_role = Role.create(:identifier => "admin")
    admin_user = User.create(:confirmed_at => DateTime.now, :email => "butts@email.com", :password => "poopypants")
    admin_user.update(:role => admin_role)

    describe 'index' do
      before :each do
        sign_in admin_user
        allow(subject).to receive(:current_user).and_return(admin_user)
      end

      it 'should be successful' do
        get :index
        expect(response.status).to eq 200
      end
    end
  end
end